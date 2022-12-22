import { Client, ClientOptions, Collection } from "discord.js";

class CustomClient extends Client {
    commands: Collection<any, any>;
    constructor(_options: ClientOptions, _commands: Collection<any, any>) {
        super(_options);
        this.commands = _commands;
    }
}

export { CustomClient };