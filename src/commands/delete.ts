import { CommandInteraction, makeError, SlashCommandBuilder, TextChannel } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Deletes X number of messages')
    .addIntegerOption((option) =>
        option.setName('amount')
            .setDescription('The number os messages to delete (default 100)')
            .setMinValue(1)
            .setMaxValue(100)
    );

export async function execute(interaction: CommandInteraction) {
    await interaction.reply(`Deleting X Messages!`);
    try { (<TextChannel>interaction.channel).bulkDelete(100); }
    catch (error) {
        console.log(error)
    }
}