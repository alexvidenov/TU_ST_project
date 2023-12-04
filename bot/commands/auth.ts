import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { db } from "../firebase.config";
//@ts-ignore
import { verify } from "node-php-password";

export const data = new SlashCommandBuilder()
  .setName("auth")
  .addStringOption((option) =>
    option
      .setName("username")
      .setDescription("Your Moodle username")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("password")
      .setDescription("Your Moodle password")
      .setRequired(true)
  )
  .setDescription("Authenticates the user with Moodle credentials");

export async function execute(interaction: ChatInputCommandInteraction) {
  const username = interaction.options.getString("username");
  const password = interaction.options.getString("password");
  const userDiscordId = interaction.user.id;

  await interaction.deferReply({ ephemeral: true });

  const usersSnapshot = await db.collection("users").get();
  const users = usersSnapshot.docs.map((doc) => doc.data());
  const user = users.findIndex(
    (u) => u.username === username && verify(password, u.password)
  );

  if (user === -1) {
    return interaction.editReply({
      content: "Invalid username or password",
    });
  }

  await interaction.editReply({
    content: "Authenticating...",
  });

  const authSnapshot = await db
    .collection("auth")
    .where("guildId", "==", interaction.guildId)
    .where("discordId", "==", userDiscordId)
    .get();

  await db.collection("auth").add({
    guildId: interaction.guildId,
    username,
    discordId: userDiscordId,
  });

  if (!authSnapshot.empty) {
    await interaction.followUp({
      content: `Found ${authSnapshot.docs.length} existing user(s) for this server. Deleting...`,
      ephemeral: true,
    });

    for (const doc of authSnapshot.docs) {
      await doc.ref.delete();
    }
  }

  return interaction.followUp({
    content: `Authenticated as ${username}`,
    ephemeral: true,
  });
}
