import { makeSuccess } from "../utils/ColorfulConsole.js";
export const name = 'ready';
export const once = true;
export function execute(client) {
    makeSuccess(`${client.user?.tag} has logged in.`);
}
