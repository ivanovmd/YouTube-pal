export const FIND = 'find'
export const INSERT = 'insert'
export const FINDONE = 'findOne'
export const UPDATE = 'update'
export const REMOVE = 'remove'

export type DatabaseOperation = typeof FIND | typeof INSERT | typeof FINDONE | typeof UPDATE | typeof REMOVE
export type DatabaseOperations = DatabaseOperation[]

export const databaseOperations: DatabaseOperations = [
  FIND,
  INSERT,
  FINDONE,
  UPDATE,
  REMOVE
]

export const dbSlices = {
  'DOWNLOAD_PATH': 'download-path',
  'PLAYLISTS_WATCHLIST': 'playlists-watchlist',
  'DOWNLOAD_QUEUE': 'download-queue',
  'DOWNLOAD_HISTORY': 'download-history',
}

export const BRIDGE_NAME = 'database'