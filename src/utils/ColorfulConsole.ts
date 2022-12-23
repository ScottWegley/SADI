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

function makeSuccess(msg:string) {
    customLog(`${ConsoleCodes.fg.Green}[SUCCESS] ${msg}`)
}

function customLog(msg:string){
    console.log(`%s${ConsoleCodes.effects.Reset}`,`${msg}`)
}

export { makeError, makeWarning, makeLog, makeHeading, makeSuccess };