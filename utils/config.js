module.exports = {
    projectId: process.env.PROJECT_ID,
    gPrivKey: process.env.GCLOUD_KEY,
    gClientEmail: process.env.GCLOUD_EMAIL,
    bucketName: process.env.BUCKET_NAME,
    serverName: process.env.SERVER_NAME,
    userName: process.env.USERNAME,
    action: process.env.ACTION || 'backup'
}