import { ConsoleCodes } from "./ConsoleCodes.js";
function makeError(msg) {
    customLog(`${ConsoleCodes.fg.Red}[!ERROR!] ${msg}`);
}
function makeWarning(msg) {
    customLog(`${ConsoleCodes.fg.Yellow}[WARNING] ${msg}`);
}
function makeLog(msg) {
    customLog(`${ConsoleCodes.fg.Black}[LOGGING] ${msg}`);
}
function makeHeading(msg) {
    customLog(`${ConsoleCodes.fg.Blue}[HEADING] ${msg}`);
}
function makeSuccess(msg) {
    customLog(`${ConsoleCodes.fg.Green}[SUCCESS] ${msg}`);
}
function customLog(msg) {
    console.log(`%s${ConsoleCodes.effects.Reset}`, `${msg}`);
}
export { makeError, makeWarning, makeLog, makeHeading, makeSuccess };
