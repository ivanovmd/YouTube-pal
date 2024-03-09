import ytdl from 'ytdl-core'
import fs from 'fs'
import { debounce } from 'advanced-throttle-debounce';
import { BaseSingleton } from '../shared/singleton'



export class DownloadService extends BaseSingleton {
  downloadLocation: string
  downloadSettings: any
  currentDownloadVideoId: string | null = null
  options = {}

  private constructor(downloadLocation: string, downloadSettings: any) {
    super();
    this.downloadLocation = downloadLocation;
    this.downloadSettings = downloadSettings;
  }

  public static getInstance(downloadLocation?: string, downloadSettings?: any): DownloadService {
    return super.getInstance(downloadLocation, downloadSettings) as DownloadService;
  }

  public getCurrentDownloadVideoId() {
    return this.currentDownloadVideoId
  }

  async getVideoInfo(videoId: string) {
    return await ytdl.getInfo(videoId);
  }

  async startDownload(videoId: string, videoName: string, onFinish?: any, onError?: any, onProgress?: any) {
    // do not allow more than one download
    if (this.currentDownloadVideoId) {
      onError && onError(videoId, 'Already downloading');
      return;
    }

    this.currentDownloadVideoId = videoId

    const url = 'http://www.youtube.com/watch?v=' + videoId
    const fileLocation = this.downloadLocation + videoName + '.mp4'

    const start = Date.now();

    const info = await ytdl.getInfo(url)
    const format = ytdl.chooseFormat(info.formats, { quality: 'lowest' });


    const stream = ytdl(url, {
      format
    })

    stream
      .pipe(fs.createWriteStream(fileLocation));

    stream
      .on('progress', (length, downloaded, total) => {
        const percent = downloaded / total;
        const downloadedMinutes = (Date.now() - start) / 1000 / 60;
        const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
        if (onProgress) {
          //onProgress = debounce(onProgress, { wait: 100, maxWait: 300, leading: true, trailing: true });
          onProgress(videoId, estimatedDownloadTime, percent)
        }
      })
      .on('end', () => {
        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s fileLocation: ${fileLocation}`);
      });

    stream.on('finish', () => {
      onFinish && onFinish(videoId)
      this.currentDownloadVideoId = null
    })

    stream.on('error', (e) => {
      onError && onError(videoId, e)
      this.currentDownloadVideoId = null
    })

  }
}