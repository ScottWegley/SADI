import { ConsoleCodes } from "./ConsoleCodes.js";
function makeError(msg) {
    customLog(`${msg}`, [ConsoleCodes.fg.Red, '[!ERROR!]']);
}
function makeWarning(msg) {
    customLog(`${msg}`, [ConsoleCodes.fg.Yellow, '[WARNING]']);
}
function makeLog(msg) {
    customLog(`${msg}`, [ConsoleCodes.fg.Black, '[LOGGING]']);
}
function makeHeading(msg) {
    customLog(`${msg}`, [ConsoleCodes.fg.Blue, '[HEADING]']);
}
function makeSuccess(msg) {
    customLog(`${msg}`, [ConsoleCodes.fg.Green, '[SUCCESS]']);
}
function customLog(msg, mods) {
    let modifier = mods.toString().replaceAll(',', '');
    console.log(`${(modifier.substring(0, modifier.lastIndexOf('[')) + `[${timestamp()} ` + modifier.substring(modifier.lastIndexOf('[') + 1)).replace(']', '] ')}%s${ConsoleCodes.effects.Reset}`, `${msg}`);
}
function timestamp() {
    let today = new Date();
    return `${today.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${today.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${today.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
}
export { makeError, makeWarning, makeLog, makeHeading, makeSuccess };
