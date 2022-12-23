import { ConsoleCodes, Foreground, Background, Effects } from "./ConsoleCodes.js";

type MessageType = '[!ERROR!]' | '[WARNING]' | '[LOGGING]' | '[HEADING]' | '[SUCCESS]';

/**
 * Prints a red message preceeded by `[!ERROR!]` with a timestamp.
 * @param msg The message to be printed.
 */
function makeError(msg: string) {
    customLog(`${msg}`, [ConsoleCodes.fg.Red, '[!ERROR!]'])
}

/**
 * Prints a yellow message preceeded by `[WARNING]` with a timestamp.
 * @param msg The message to be printed.
 */
function makeWarning(msg: string) {
    customLog(`${msg}`, [ConsoleCodes.fg.Yellow, '[WARNING]'])
}

/**
 * Prints a black message preceeded by `[LOGGING]` with a timestamp.
 * @param msg The message to be printed.
 */
function makeLog(msg: string) {
    customLog(`${msg}`, [ConsoleCodes.fg.Black, '[LOGGING]'])
}

/**
 * Prints a blue message preceeded by `[HEADING]` with a timestamp.
 * @param msg The message to be printed.
 */
function makeHeading(msg: string) {
    customLog(`${msg}`, [ConsoleCodes.fg.Blue, '[HEADING]'])
}

/**
 * Prints a green message preceeded by `[SUCCESS]` with a timestamp.
 * @param msg The message to be printed.
 */
function makeSuccess(msg: string) {
    customLog(`${msg}`, [ConsoleCodes.fg.Green, '[SUCCESS]']);
}

/**
 * An internal function that takes in a message and modifiers to be applied to it.
 * @param msg The message to be printed.
 * @param mods Modifiers of `Foreground`, `Background`, and `Effects` are visual alterations while `MessageType` indicates the prinout representing the type of message.
 */
function customLog(msg: string, mods: (Foreground | Background | Effects | MessageType)[]) {
    let modifier = mods.toString().replaceAll(',','');
    console.log(`${(modifier.substring(0,modifier.lastIndexOf('[')) + `[${timestamp()} ` + modifier.substring(modifier.lastIndexOf('[') + 1)).replace(']','] ')}%s${ConsoleCodes.effects.Reset}`, `${msg}`)
}

/**
 * Returns the local time as a `string` in the format of `XX:XX:XX` in the local timezone.
 */
function timestamp() {
    let today = new Date();
    return `${today.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${today.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${today.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
}

export { makeError, makeWarning, makeLog, makeHeading, makeSuccess };