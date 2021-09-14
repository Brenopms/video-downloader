import * as tikTok from 'tiktok-scraper'
import { createWriteStream } from 'fs'
import fetch from 'node-fetch';

import { VideoDownloader } from '../VideoDownloader';
import { isValidUrl } from '../utils/validators';
import { Domains } from '../utils/constants';

export class TikTokVideoDownloader implements VideoDownloader {
    #validateVideo(url: string): void {
        if (!isValidUrl(url, Domains.TIKTOK)) {
            throw new Error('Invalid URL')
        }
    }


    async #downloadVideoFromMeta(videoMeta: tikTok.Result, path: string) {
        const videoRequestHeaders = videoMeta?.headers
        const videoUrl = videoMeta?.collector?.[0].videoUrl

        if(!videoRequestHeaders || !videoUrl) {
            throw new Error('Could not Fetch Video Meta')
        }

        const response = await fetch(videoUrl, { 
            headers: {
                ...videoRequestHeaders
            }
        })

        response.body?.pipe(createWriteStream(path))
    }

    async downloadVideo(url: string, path: string) {
        this.#validateVideo(url)
        const videoMeta = await tikTok.getVideoMeta(url)
        await this.#downloadVideoFromMeta(videoMeta, path)
    }
}