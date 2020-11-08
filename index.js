const { action } = require('./utils/config');
const { createBackup, restoreBackup } = require('./backup');

if (action === 'backup') {
    createBackup()
        .then(result => console.log(result))
        .catch(err => console.log('failed ' + err))
}

if (action === 'restore') {
    restoreBackup()
        .then(result => console.log(result ? 'success' : 'failed'))
        .catch(err => console.log('failed ' + err))
}