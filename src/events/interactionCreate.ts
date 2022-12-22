import { CommandInteraction } from "discord.js";
import { makeError, makeLog } from "../utils/ColorfulConsole.js";
import { CustomClient } from "../utils/CustomClient.js";

export const name = 'interactionCreate';
export const once = false;
export async function execute(interaction:CommandInteraction){
    if (interaction.isChatInputCommand()) {
        const command = (<CustomClient>interaction.client).commands.get(interaction.commandName);
        if (!command) {
            makeError(`No command with ${interaction.commandName}`);
            return;
        }
        try {
            await command.execute(interaction);
        } catch (e) {
            console.log(e);
        }
    } else {

    }
}