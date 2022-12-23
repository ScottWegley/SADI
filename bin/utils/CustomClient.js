import { Client } from "discord.js";
/**
 * Intermediary type only different from `Client` by a `Collection` to store command json and the command object itself.
 */
class CustomClient extends Client {
    constructor(_options, _commands) {
        super(_options);
        this.commands = _commands;
    }
}
export { CustomClient };
