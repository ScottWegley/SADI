import { makeLog } from "../utils/ColorfulConsole.js";

export const name = 'ready';
export const once = true;
export function execute(client){
    makeLog(`${client.user.tag} has logged in.`);
}