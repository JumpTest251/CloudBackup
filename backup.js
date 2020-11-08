const gcloud = require('./utils/gcloud')
const { compress, uncompress } = require('./utils/compress');
const { serverName, userName } = require('./utils/config');

const basePath = `/home/mccloud`;
const backupName = 'backup.tar.gz';

module.exports.createBackup = async function () {
    console.log(`compressing ${basePath}/${serverName} into ${backupName}...`)

    await compress(serverName, `./${backupName}`, basePath);

    console.log('done.');
    console.log('starting upload...');

    const result = await gcloud.uploadFile(`${userName.toLowerCase()}/${serverName.toLowerCase()}/${backupName}`, backupName);
    console.log('finished upload.')

    return result;
}


