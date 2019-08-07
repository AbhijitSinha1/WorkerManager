const { spawn } = require('child_process');

if (process.argv.length < 3) {
    throw new Error('Need the process to give to worker thread');
}

const task = process.argv[2];
const count = process.argv[3] || 1;

const displayLog = (process) => (element) => console.log(`[LOG] | process: ${process} | message: ${element}`);
const displayError = (process) => (element) => console.error(`[ERR] | process: ${process} | message: ${element}`);

const children = [];

for (var i = 0; i < count; i++) {
    children[i] = spawn('node', [task]);
    children[i].stdout.on('data', displayLog(`child${i}`));
    children[i].stderr.on('data', displayError(`child${i}`));
    children[i].on('exit', (code, signal) => displayError(`child${i}`)(JSON.stringify({ code, signal })));
}

const killAll = (signal) => () => {
    console.log(`killing due to: ${signal}`);
    for (var i = 0; i < children.length; i++) {
        children[i].kill();
    }
}

process.on('exit', killAll('exit'));
process.on('SIGINT', killAll('SIGINT'));
process.on('SIGUSR1', killAll('SIGUSR1'));
process.on('SIGUSR2', killAll('SIGUSR2'));
process.on('uncaughtException', killAll('uncaughtException'));