const tar = require('tar');
const { spawn } = require('child_process');

module.exports.compress = function (directory, output, cwd) {
    return tar.c({
        gzip: true,
        file: output,
        cwd
    },
        [directory])
}

module.exports.uncompress = function (archive, cwd) {
    /* return tar.x({
         file: archive,
         cwd
     }) */

    const exec = spawn('tar', ['xvzf', archive, '-C', cwd]);

    return new Promise((resolve, reject) => {
        exec.on('error', err => {
            return reject(err);
        })

        exec.on('exit', (code, signal) => {
            resolve({ code, signal });
        })
    })

}