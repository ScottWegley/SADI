import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');
export async function execute(interaction) {
    interaction.channel?.sendTyping();
    let sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    await interaction.editReply(`Pong! ${(sent).createdTimestamp - interaction.createdTimestamp}ms`);
}
