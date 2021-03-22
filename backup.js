const fs = require('fs');
const del = require('del');

const gcloud = require('./utils/gcloud')
const { compress, uncompress } = require('./utils/compress');
const { serverName, userName, maxSize, generation } = require('./utils/config');

const basePath = `/home/mccloud`;
const backupName = 'backup.tar.gz';
const cloudPath = `${userName.toLowerCase()}/${serverName.toLowerCase()}/${backupName}`;

module.exports.createBackup = async function () {
    console.log(`compressing ${basePath}/${serverName} into ${backupName}...`)

    await compress(serverName, `./${backupName}`, basePath);

    console.log('done.');

    const { size } = fs.statSync(backupName);
    const mb = size / 1000000.0;
    console.log(`compressed file size: ${mb}mb`)
    if (mb > maxSize) throw 'backup exceeds maximum size aborting...'

    console.log('starting upload...');

    const result = await gcloud.uploadFile(cloudPath, backupName);
    console.log('finished upload.')

    return result;
}

module.exports.restoreBackup = async function () {
    console.log(`downloading ${backupName}...`)

    await gcloud.downloadFile(backupName, cloudPath, generation);
    console.log('done. deleting old directory...')
    await del(`${basePath}/${serverName}`, { force: true })

    console.log('uncompressing...');

    await uncompress(`./${backupName}`, basePath)

    return true;
}


