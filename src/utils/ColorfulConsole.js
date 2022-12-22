function makeError(msg) {
    console.log('\x1b[31m%s\x1b[0m', `[!ERROR!] ${msg}`);
}

function makeWarning(msg) {
    console.log('\x1b[33m%s\x1b[0m', `[WARNING] ${msg}`);
}

function makeLog(msg) {
    console.log('\x1b[32m%s\x1b[0m', `[LOGGING] ${msg}`);
}

function makeHeading(msg) {
    console.log('\x1b[34m%s\x1b[0m', `[HEADING] ${msg}`);
}

export { makeError, makeWarning, makeLog, makeHeading };