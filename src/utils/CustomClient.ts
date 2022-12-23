import { Client, ClientOptions, Collection } from "discord.js";

/**
 * Intermediary type only different from `Client` by a `Collection` to store command json and the command object itself.
 */
class CustomClient extends Client {
    commands: Collection<any, any>;
    constructor(_options: ClientOptions, _commands: Collection<any, any>) {
        super(_options);
        this.commands = _commands;
    }
}

export { CustomClient };