import { CommandInteraction, InteractionResponse, Message, SlashCommandBuilder } from 'discord.js';
import { makeLog } from '../utils/ColorfulConsole.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

export async function execute(interaction: CommandInteraction) {
    interaction.channel?.sendTyping();
    let sent = await interaction.reply({content:'Pinging...', fetchReply:true, ephemeral: true});
    await interaction.editReply(`Pong! ${(sent).createdTimestamp - interaction.createdTimestamp}ms`);
}