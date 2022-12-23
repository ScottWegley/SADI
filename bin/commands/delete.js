import { SlashCommandBuilder } from "discord.js";
export const data = new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Deletes X number of messages');
export async function execute(interaction) {
    await interaction.reply(`Deleting X Messages!`);
    try {
        interaction.channel.bulkDelete(100);
    }
    catch (error) {
        console.log(error);
    }
}
