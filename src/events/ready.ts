import { makeLog } from "../utils/ColorfulConsole.js";
import { CustomClient } from "../utils/CustomClient.js";

export const name = 'ready';
export const once = true;
export function execute(client:CustomClient){
    makeLog(`${client.user?.tag} has logged in.`);
}