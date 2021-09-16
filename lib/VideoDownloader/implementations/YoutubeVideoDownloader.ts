import ytdl from 'ytdl-core';
import { createWriteStream } from 'fs'

import { VideoDownloader } from '../VideoDownloader';
import { isValidUrlString } from '../utils/validators';
import { ensureDirectoryExistence } from '../utils/fileSystem';

export class YoutubeVideoDownloader implements VideoDownloader {
    #validateVideo(url: string): void {
        if (!isValidUrlString(url) || !ytdl.validateURL(url)) {
            throw new Error('Invalid URL')
        }
    }

    async downloadVideo(url: string, path: string) {
        this.#validateVideo(url)
        ensureDirectoryExistence(path)
        ytdl(url).pipe(createWriteStream(path))
    }
}