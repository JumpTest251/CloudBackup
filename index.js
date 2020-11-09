const { action } = require('./utils/config');
const { createBackup, restoreBackup } = require('./backup');

if (action === 'backup') {
    createBackup()
        .then(result => console.log(result))
        .catch(() => process.exit(1))
}

if (action === 'restore') {
    restoreBackup()
        .then(result => {
            if (!result) process.exit(1);
        })
        .catch(() => process.exit(1))
}