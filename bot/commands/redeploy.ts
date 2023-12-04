import {
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import deployCommands from "../lib/deploy-commands";

export const data = new SlashCommandBuilder()
  .setName("redeploy")
  .setDescription("Redeploys the commands to the Discord guild")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: CommandInteraction) {
  await deployCommands({ guildId: interaction.guildId! });
  return interaction.reply("Commands deployed!");
}
