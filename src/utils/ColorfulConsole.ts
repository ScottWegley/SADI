import { ConsoleCodes, Foreground, Background, Effects } from "./ConsoleCodes.js";

type MessageType = '[!ERROR!]' | '[WARNING]' | '[LOGGING]' | '[HEADING]' | '[SUCCESS]';

function makeError(msg: string) {
    customLog(`${msg}`, [ConsoleCodes.fg.Red, '[!ERROR!]'])
}

function makeWarning(msg: string) {
    customLog(`${msg}`, [ConsoleCodes.fg.Yellow, '[WARNING]'])
}

function makeLog(msg: string) {
    customLog(`${msg}`, [ConsoleCodes.fg.Black, '[LOGGING]'])
}

function makeHeading(msg: string) {
    customLog(`${msg}`, [ConsoleCodes.fg.Blue, '[HEADING]'])
}

function makeSuccess(msg: string) {
    customLog(`${msg}`, [ConsoleCodes.fg.Green, '[SUCCESS]']);
}

function customLog(msg: string, mods: (Foreground | Background | Effects | MessageType)[]) {
    let modifier = mods.toString().replaceAll(',','');
    console.log(`${(modifier.substring(0,modifier.lastIndexOf('[')) + `[${timestamp()} ` + modifier.substring(modifier.lastIndexOf('[') + 1)).replace(']','] ')}%s${ConsoleCodes.effects.Reset}`, `${msg}`)
}

function timestamp() {
    let today = new Date();
    return `${today.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${today.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${today.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
}

export { makeError, makeWarning, makeLog, makeHeading, makeSuccess };