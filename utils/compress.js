const tar = require('tar');

module.exports.compress = function (directory, output, cwd) {
    return tar.c({
        gzip: true,
        file: output,
        cwd
    },
        [directory])
}

module.exports.uncompress = function (archive, cwd) {
    return tar.x({
        file: archive,
        cwd
    })
}