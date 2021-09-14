import { TikTokVideoDownloader } from './lib/VideoDownloader/implementations/TikTokVideoDownloader';
import { YoutubeVideoDownloader } from './lib/VideoDownloader/implementations/YoutubeVideoDownloader';

const DEFAULT_PATH = 'video.mp4'

const youtubeDownloader = new YoutubeVideoDownloader()
const tikTokDownloader = new TikTokVideoDownloader()

youtubeDownloader
    .downloadVideo('https://www.youtube.com/watch?v=pYZQVgL84rA', DEFAULT_PATH)
    .then(res => console.log(res))
    .catch(err => console.log(err))


tikTokDownloader
    .downloadVideo('https://www.tiktok.com/@cutepetowner/video/6980867950899137798?sender_device=pc&sender_web_id=7007559321052300806&is_from_webapp=v1&is_copy_url=0', 'test.mp4')
    .then(res => console.log(res))
    .catch(err => console.log(err))