export interface VideoDownloader {
    downloadVideo(url: string, path: string): Promise<void>
}