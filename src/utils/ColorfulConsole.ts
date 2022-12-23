import { ConsoleCodes, Foreground, Background, Effects } from "./ConsoleCodes.js";

function makeError(msg:string) {
    customLog(`${ConsoleCodes.fg.Red}[!ERROR!] ${msg}`)
}

function makeWarning(msg:string) {
    customLog(`${ConsoleCodes.fg.Yellow}[WARNING] ${msg}`)
}

function makeLog(msg:string) {
    customLog(`${ConsoleCodes.fg.Black}[LOGGING] ${msg}`)
}

function makeHeading(msg:string) {
    customLog(`${ConsoleCodes.fg.Blue}[HEADING] ${msg}`)
}

function customLog(msg: string, mods: (Foreground | Background | Effects | MessageType)[]) {
    let modifier: string = '';
    mods.forEach((x) => {
        modifier += x;
    });
    console.log(`${(modifier.substring(0,modifier.lastIndexOf('[')) + `[${timestamp()} ` + modifier.substring(modifier.lastIndexOf('[') + 1)).replace(']','] ')}%s${ConsoleCodes.effects.Reset}`, `${msg}`)
}

function timestamp() {
    let today = new Date();
    return `${today.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${today.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${today.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
}

export { makeError, makeWarning, makeLog, makeHeading, makeSuccess };