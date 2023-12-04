import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { db } from "../firebase.config";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Checks the connection with Firebase Firestore");

export async function execute(interaction: CommandInteraction) {
  const nonExistentCollectionRef = db.collection("nonExistentCollection");

  try {
    await nonExistentCollectionRef.get();

    return interaction.reply("Firestore connection is working!");
  } catch (error) {
    return interaction.reply("Error accessing Firestore");
  }
}
