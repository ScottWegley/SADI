import { config } from 'dotenv';
import { Client, Collection, CommandInteractionOptionResolver, GatewayIntentBits, REST, Routes } from 'discord.js';
import { ludwigLiveCheck } from './scripts/ludwigLive.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { makeError, makeWarning, makeLog, makeHeading } from './utils/ColorfulConsole.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => { console.log(`${client.user.tag} has logged in.`) });

    client.commands = new Collection();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    const cmdArr = [];

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file).replaceAll('\\', '/');
        const command = await import(`file:///${filePath}`);
        if (command.data != undefined && command.execute != undefined) {
            client.commands.set(command.data.name, command);
            cmdArr.push(command.data.toJSON());
        } else {
            makeWarning(`The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

    try {
        const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: cmdArr });
        makeLog(`Reloaded ${data.length} slash (/) commands.`)
        client.login(TOKEN);
        setInterval(ludwigLiveCheck, 120000, client)
    } catch (e) {
        console.log(e);
    }
}

main();