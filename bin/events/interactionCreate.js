import { makeError } from "../utils/ColorfulConsole.js";
export const name = 'interactionCreate';
export const once = false;
export async function execute(interaction) {
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            makeError(`No command with ${interaction.commandName}`);
            return;
        }
        try {
            await command.execute(interaction);
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
    }
}
