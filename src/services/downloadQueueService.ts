

export class DownloadQueueService {
  currentDownloadingVideoId: string
  videoIdsInQueue: string[]

  private static instance: DownloadQueueService;

  constructor() {
    this.currentDownloadingVideoId = '';
    this.videoIdsInQueue = [];
  }

  public static getInstance(): DownloadQueueService {
    if (!DownloadQueueService.instance) {
      DownloadQueueService.instance = new DownloadQueueService();
    }
    return DownloadQueueService.instance;
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