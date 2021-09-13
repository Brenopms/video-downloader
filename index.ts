import { YoutubeVideoDownloader } from './lib/VideoDownloader/implementations/YoutubeVideoDownloader';

const DEFAULT_PATH = 'video.mp4'

const youtubeDownloader = new YoutubeVideoDownloader()

youtubeDownloader
    .downloadVideo('https://www.youtube.com/watch?v=pYZQVgL84rA', DEFAULT_PATH)
    .then(res => console.log(res))
    .catch(err => console.log(err))