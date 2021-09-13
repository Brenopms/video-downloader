import ytdl from 'ytdl-core';
import { createWriteStream } from 'fs'

import { VideoDownloader } from '../VideoDownloader';
import { isValidUrl } from '../utils/validators';
import { Domains } from '../utils/constants';

export class YoutubeVideoDownloader implements VideoDownloader {
    #validateVideo(url: string): void {
        if (!isValidUrl(url, Domains.YOUTUBE) || !ytdl.validateURL(url)) {
            throw new Error('Invalid URL')
        }
    }

    async downloadVideo(url: string, path: string) {
        this.#validateVideo(url)
        ytdl(url).pipe(createWriteStream(path))
    }
}