import {
  ChatInputCommandInteraction,
  Collection,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { db } from "../firebase.config";
import { COHORT_ROLE_REGEX, COHORT_ROLE_MAP, COHORT_YEAR_REGEX } from "../lib/constants";


export const data = new SlashCommandBuilder()
  .setName("sync")
  .setDescription("Sync data from Firestore to Discord")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const authForGuildSnapshot = await db
    .collection("auth")
    .where("guildId", "==", interaction.guildId)
    .get();

  if (authForGuildSnapshot.empty) {
    return interaction.editReply({
      content: "No authenticated users found for this server",
    });
  }

  const authForGuild = authForGuildSnapshot.docs.map((doc) => doc.data());
  const usersSnapshot = await db
    .collection("users")
    .where(
      "username",
      "in",
      authForGuild.map((auth) => auth.username)
    )
    .get();

  if (usersSnapshot.empty) {
    return interaction.editReply({
      content: "No Moodle users found that match the authenticated users",
    });
  }

  const users = usersSnapshot.docs.map((doc) => doc.data());

  const discordUsers =
    (await interaction.guild?.members.fetch({
      user: authForGuild
        .map((auth) => auth.discordId)
        .filter((auth) => auth.discordId !== interaction.guild?.ownerId),
    })) || [];

  await interaction.editReply({
    content: "Syncing...",
  });

  for (const discordUser of discordUsers) {
    const auth = authForGuild.find((auth) => auth.discordId === discordUser[0]);

    if (!auth) {
      await interaction.followUp({
        content: `No auth found for ${discordUser[1].user.tag}`,
        ephemeral: true,
      });
      continue;
    }

    const user = users.find((user) => user.username === auth.username);
    if (!user) {
      await interaction.followUp({
        content: `No Moodle user found for ${discordUser[1].user.tag}`,
        ephemeral: true,
      });
      continue;
    }

    const earliestCohort: string = user.cohorts.sort(
      (a: string, b: string): number => {
        const yearA: number = parseInt(a.match(COHORT_YEAR_REGEX)?.[0] || "");
        const yearB: number = parseInt(b.match(COHORT_YEAR_REGEX)?.[0] || "");
        return yearA - yearB;
      }
    )[0];

    const roles = await interaction.guild?.roles.fetch();
    const allCohorRoles =
      roles?.filter((role) => role.name.match(COHORT_ROLE_REGEX)) ||
      new Collection();

    const earliestCohortYear = parseInt(
      earliestCohort?.match(COHORT_YEAR_REGEX)?.[0] || ""
    );

    let cohortString = earliestCohort?.replace(/[\s\/]*\d+$/, '');

    COHORT_ROLE_MAP.has(cohortString) ? cohortString = COHORT_ROLE_MAP.get(cohortString)! : cohortString;
    
    let earliestCohortRole = allCohorRoles.find(
      (role) => role.name === `${cohortString + earliestCohortYear}`
    );

    if (!earliestCohortRole) {
      earliestCohortRole = await interaction.guild?.roles.create({
        name: `${cohortString + earliestCohortYear}`,
        color: "Default",
      });
    }

    const rolesToDelete = allCohorRoles.filter((role) => {
      const roleYear = parseInt(role.name.match(COHORT_YEAR_REGEX)?.[0] || "");
      return roleYear < earliestCohortYear;
    });

    await discordUser[1].roles.remove(rolesToDelete);
    await discordUser[1].roles.add(earliestCohortRole!);

    await discordUser[1].setNickname(
      `${user.firstname} ${user.lastname} (${
        user.course
      } курс ${user.degree.charAt(0)})`
    );
  }

  await interaction.followUp({
    content: "Sync complete!",
    ephemeral: true,
  });
}
