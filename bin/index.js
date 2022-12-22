import { config } from 'dotenv';
import { Collection, GatewayIntentBits, REST, Routes } from 'discord.js';
import { ludwigLiveCheck } from './scripts/ludwigLive.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { makeWarning, makeHeading, makeSuccess } from './utils/ColorfulConsole.js';
import { CustomClient } from './utils/CustomClient.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config();
const TOKEN = process.env.SADI_TOKEN;
const CLIENT_ID = process.env.SADI_CLIENT_ID;
const GUILD_ID = process.env.THELAB_ID;
const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
}, new Collection());
const rest = new REST({ version: '10' }).setToken(TOKEN);
async function main() {
    makeHeading("EXECUTING MAIN");
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file).replaceAll('\\', '/');
        const event = await import(`file:///${filePath}`);
        if (event.name != undefined && event.execute != undefined) {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            }
            else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
        else {
            makeWarning(`The event at ${filePath} is missing a required "name" or "execute" property.`);
        }
    }
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
        }
        else {
            makeWarning(`The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
    try {
        const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: cmdArr });
        makeSuccess(`Reloaded ${data.length} slash (/) commands.`);
        client.login(TOKEN);
        setInterval(ludwigLiveCheck, 120000, client);
    }
    catch (e) {
        console.log(e);
    }
}
main();
