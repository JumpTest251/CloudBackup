const { Storage } = require('@google-cloud/storage');
const config = require('./config');

const storage = new Storage({
    projectId: config.projectId,
    credentials: {
        private_key: config.gPrivKey.replace(/\\n/g, '\n'),
        client_email: config.gClientEmail
    }
})


module.exports.listFiles = function (prefix, versions = false) {
    return storage.bucket(config.bucketName).getFiles({
        prefix,
        versions
    })
}


module.exports.uploadFile = function (destination, filename) {
    return storage.bucket(config.bucketName).upload(filename, {
        gzip: true,
        destination,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        },
    })
}

module.exports.downloadFile = function (destination, file, generation) {
    return storage.bucket(config.bucketName).file(file, {
        generation
    }).download({ destination })
}