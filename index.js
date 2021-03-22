const { action } = require('./utils/config');
const { createBackup, restoreBackup } = require('./backup');

if (action === 'backup') {
    createBackup()
        .then(result => console.log(result))
        .catch((err) => {
            console.log('Backup failed: ', err);

            process.exit(1)
        })
}

if (action === 'restore') {
    restoreBackup()
        .then(result => {
            if (!result) process.exit(1);
        })
        .catch((err) => {
            console.log('Restore failed: ', err);

            process.exit(1)
        })
}