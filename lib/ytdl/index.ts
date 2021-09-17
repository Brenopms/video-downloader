import ytdl from 'ytdl-core'

const validateURL = ytdl.validateURL
const getInfo = ytdl.getInfo
const downloadFromInfo = ytdl.downloadFromInfo

export {
    validateURL,
    getInfo,
    downloadFromInfo
}