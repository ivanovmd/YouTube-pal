import { BaseSingleton } from "../shared/singleton";

export class DownloadQueueService extends BaseSingleton {
  currentDownloadingVideoId: string
  videoIdsInQueue: string[]

  constructor() {
    super()
    this.currentDownloadingVideoId = '';
    this.videoIdsInQueue = [];
  }

  onVideoDownloadStarted = (videoId: string) => {
    console.log('onVideoDownloadStarted', videoId)
  }

  onVideoDownloadFinished = (videoId: string) => {
    console.log('onVideoDownloadFinished', videoId)
  }

  onVideoDownloadError = (videoId: string, error: any) => {
    console.log('onVideoDownloadError', videoId, error)
  }
}