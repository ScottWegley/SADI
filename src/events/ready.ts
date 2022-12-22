import { makeSuccess } from "../utils/ColorfulConsole.js";
import { CustomClient } from "../utils/CustomClient.js";

export const name = 'ready';
export const once = true;
export function execute(client:CustomClient){
    makeSuccess(`${client.user?.tag} has logged in.`);
}