import { Client } from "discord.js";
class CustomClient extends Client {
    constructor(_options, _commands) {
        super(_options);
        this.commands = _commands;
    }
}
export { CustomClient };
