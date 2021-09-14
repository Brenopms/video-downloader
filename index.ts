import { Command } from 'commander';
import { TikTokVideoDownloader } from './lib/VideoDownloader/implementations/TikTokVideoDownloader';
import { YoutubeVideoDownloader } from './lib/VideoDownloader/implementations/YoutubeVideoDownloader';
import { VideoFormat } from './lib/VideoDownloader/utils/constants';

const DEFAULT_PATH = './downloads/'
const DEFAULT_NAME = 'video'
const DEFAULT_FORMAT = VideoFormat.MP4

const youtubeDownloader = new YoutubeVideoDownloader()
const tikTokDownloader = new TikTokVideoDownloader()

const program = new Command()
program
  .argument('<url>', 'Video Url to download')
  .option('-f, --format <format>', 'Video format output <format>', DEFAULT_FORMAT)
  .option('-n, --name <name>', 'File name <name>', DEFAULT_NAME)
  .option('-p, --path <path>', 'Default file path <path>(folder must exist)', DEFAULT_PATH)
  .parse(process.argv)

const videoUrl = program?.args[0]

const options = program.opts();
const videoFormat = options.format || DEFAULT_FORMAT
const fileName = options.name || DEFAULT_NAME
const path = options.path || DEFAULT_PATH

const completePath = `${path}${fileName}.${videoFormat}`
/* console.log(completePath)
console.log(program.args)
console.log(options) */


// -- Usage: npm start -- https://www.youtube.com/watch?v=woGfOQ6Ze90 -f wmv -n teste1 
 youtubeDownloader
     .downloadVideo(videoUrl, completePath)
     .then(res => console.log(res))
     .catch(err => console.log(err))



/* tikTokDownloader
    .downloadVideo('https://www.tiktok.com/@cutepetowner/video/6980867950899137798?sender_device=pc&sender_web_id=7007559321052300806&is_from_webapp=v1&is_copy_url=0', './downloads/test.mp4')
    .then(res => console.log(res))
    .catch(err => console.log(err)) */