import ytdl from 'ytdl-core'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'

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

  startDownload(videoId: string, videoName: string, onFinish?: any, onError?: any, onProgress?: any) {
    const url = 'http://www.youtube.com/watch?v=' + videoId
    const fileLocation = this.downloadLocation + videoName + '.mp3'

    const start = Date.now();


    const stream = ytdl(url, { quality: 'highestaudio' })

    stream
      .pipe(fs.createWriteStream(fileLocation));

    stream
      .on('progress', (length, downloaded, total) => {
        const percent = downloaded / total;
        const downloadedMinutes = (Date.now() - start) / 1000 / 60;
        const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
        onProgress(estimatedDownloadTime, percent)
      })
      .on('end', () => {
        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
      });

    stream.on('finish', () => {
      onFinish(videoId)
    })

    stream.on('error', (e) => {
      onError(videoId, e)
    })

  }
}