import { config } from 'dotenv';
import { Client, CommandInteractionOptionResolver, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

config();
const TOKEN = process.env.SADI_TOKEN;
const CLIENT_ID = process.env.SADI_CLIENT_ID
const GUILD_ID = process.env.THELAB_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const rest = new REST({ version: '10' }).setToken(TOKEN)

client.on('ready', () => { console.log(`${client.user.tag} has logged in.`) });

async function main() {
    const commmands = [
        {
            name: 'ping',
            description: 'Replies with "Pong!"',
        },
    ];

    try {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commmands,
        });
        client.login(TOKEN);
    } catch (error) {
        console.log(error);
    }
}

main();