var spawn = require('child_process').spawn;

var productionEnv = process.env; // TODO should clone process.env like utils.extend
productionEnv.NODE_ENV = 'harryfeng';

var start = spawn('forever', ['start', 'getUrl.js'], {env: productionEnv});

start.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
});

start.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
});

start.on('exit', function(code, signal) {
    console.log('child process exited with ' +
        `code ${code} and signal ${signal}`);
});