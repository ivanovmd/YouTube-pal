import ytdl from 'ytdl-core'
import fs from 'fs'

export class DownloadService {
  downloadLocation: string
  downloadSettings: any

  options = {}

  constructor(downloadLocation: string, downloadSettings: any) {
    this.downloadLocation = downloadLocation;
    this.downloadSettings = downloadSettings;
  }

  async getVideoInfo(videoId: string) {
    return await ytdl.getInfo(videoId);
  }

  async startDownload(videoId: string, videoName: string, onFinish?: any, onError?: any, onProgress?: any) {
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

        onProgress && onProgress(videoId, estimatedDownloadTime, percent)
      })
      .on('end', () => {
        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
      });

    stream.on('finish', () => {
      onFinish && onFinish(videoId)
    })

    stream.on('error', (e) => {
      onError && onError(videoId, e)
    })

  }
}