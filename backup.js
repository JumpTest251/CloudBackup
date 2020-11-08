const gcloud = require('./utils/gcloud')
const { compress, uncompress } = require('./utils/compress');
const { serverName, userName } = require('./utils/config');

const basePath = `/home/mccloud`;
const backupName = 'backup.tar.gz';
const cloudPath = `${userName.toLowerCase()}/${serverName.toLowerCase()}/${backupName}`;

module.exports.createBackup = async function () {
    console.log(`compressing ${basePath}/${serverName} into ${backupName}...`)

    await compress(serverName, `./${backupName}`, basePath);

    console.log('done.');
    console.log('starting upload...');

    const result = await gcloud.uploadFile(cloudPath, backupName);
    console.log('finished upload.')

    return result;
}

module.exports.restoreBackup = async function () {
    console.log(`downloading ${backupName}...`)

    await gcloud.downloadFile('backup.tar.gz', cloudPath);
    console.log('done.')
    console.log('uncompressing...');

    await uncompress(`./${backupName}`, basePath)
}


