import ytdl from 'ytdl-core';
import { createWriteStream } from 'fs'

import { VideoDownloader } from '../VideoDownloader';
import { isValidUrlString } from '../utils/validators';
import { ensureDirectoryExistence } from '../utils/fileSystem';
import { downloadFromInfo, getInfo, validateURL } from '../../../lib/ytdl';

export class YoutubeVideoDownloader implements VideoDownloader {

    #logVideoInfo(videoInfo: ytdl.videoInfo) {
        console.table({
            name: videoInfo?.videoDetails?.title,
            author: videoInfo?.videoDetails?.author?.name,
            description: videoInfo?.videoDetails?.description?.slice(0, 100) // display only part of the description
        })
    }

    #validateVideo(url: string): void {
        if (!isValidUrlString(url) || !validateURL(url)) {
            throw new Error('Invalid URL')
        }
    }

    async downloadVideo(url: string, path: string) {
        this.#validateVideo(url)
        ensureDirectoryExistence(path)
        
        const videoInfo = await getInfo(url)

        this.#logVideoInfo(videoInfo)
        downloadFromInfo(videoInfo).pipe(createWriteStream(path))
    }
}