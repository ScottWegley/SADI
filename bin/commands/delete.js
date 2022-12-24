import { SlashCommandBuilder } from "discord.js";
import { makeLog } from "../utils/ColorfulConsole.js";
export const data = new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Deletes X number of messages')
    .addIntegerOption((option) => option.setName('amount')
    .setDescription('The number os messages to delete (default and max 100)')
    .setMinValue(1)
    .setMaxValue(100));
export async function execute(interaction) {
    let amt = interaction.options.getInteger('amount') || 100;
    await interaction.reply({ content: `Deleting ${amt} Messages!`, ephemeral: true });
    try {
        interaction.channel.bulkDelete(amt);
        makeLog(`Deleted ${amt} messsages`);
    }
    catch (error) {
        console.log(error);
    }
}
