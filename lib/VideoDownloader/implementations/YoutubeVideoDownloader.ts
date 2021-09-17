import ytdl from 'ytdl-core';
import { createWriteStream } from 'fs'

import { VideoDownloader } from '../VideoDownloader';
import { isValidUrlString } from '../utils/validators';
import { ensureDirectoryExistence } from '../utils/fileSystem';

export class YoutubeVideoDownloader implements VideoDownloader {

    #logVideoInfo(videoInfo: ytdl.videoInfo) {
        console.table({
            name: videoInfo?.videoDetails?.title,
            author: videoInfo?.videoDetails?.author?.name,
            description: videoInfo?.videoDetails?.description?.slice(0, 100) // display only part of the description
        })
    }

    #validateVideo(url: string): void {
        if (!isValidUrlString(url) || !ytdl.validateURL(url)) {
            throw new Error('Invalid URL')
        }
    }

    async downloadVideo(url: string, path: string) {
        this.#validateVideo(url)
        ensureDirectoryExistence(path)
        
        const videoInfo = await ytdl.getInfo(url)

        this.#logVideoInfo(videoInfo)
        ytdl.downloadFromInfo(videoInfo).pipe(createWriteStream(path))
    }
}