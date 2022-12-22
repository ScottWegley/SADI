import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')

export async function execute(interaction) {
    let sent = await interaction.reply('Pinging...');
    interaction.channel.startTyping();
    await interaction.editReply(`Pong! ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
}