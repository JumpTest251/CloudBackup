const { action } = require('./utils/config');
const { createBackup, restoreBackup } = require('./backup');

//compress('plugins', './extraci/backup.tar.gz', './extraci')
//uncompress('./extraci/backup.tar.gz', './')

if (action === 'backup') {
    createBackup().then(result => console.log(result))
}

if (action === 'restore') {
    restoreBackup().then(() => console.log('restore finished'))
}