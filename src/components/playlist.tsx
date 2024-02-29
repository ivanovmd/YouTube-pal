import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Videos from './videos';
import { DatabaseSliceCallers } from '../infrastructure/database/callers';
import { dbSlices } from '../infrastructure/database/constants';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/joy';
import { FileDownload } from '@mui/icons-material';

const playlistsWatchlistCallers = new DatabaseSliceCallers(dbSlices.PLAYLISTS_WATCHLIST).getCallers();

const Playlist = ({ playlist }) => {
  const [isWatched, setIsWatched] = useState(false)


  useEffect(() => {
    console.log(playlist);
  }, [playlist])

  useEffect(() => {
    playlistsWatchlistCallers.findOne({ id: playlist.id }).then(response => {
      if (response) {
        setIsWatched(true)
      }
    })
  }, [])

  const addToWatchlist = () => {
    playlistsWatchlistCallers.insert({ id: playlist.id })
    setIsWatched(true)
  }

  const removeFromWatchlist = () => {
    playlistsWatchlistCallers.remove({ id: playlist.id })
    setIsWatched(false)
  }

  const toggleAddWToWatchlist = () => {
    if (isWatched) {
      removeFromWatchlist()
    } else {
      addToWatchlist()
    }
  }

  return <div title={playlist.snippet.title}>
    <Link to={`/playlists/${playlist.id}`}>
      <Box padding={2} sx={{ maxWidth: '300px' }}>
        <img style={{ maxWidth: '100%', borderRadius: '10px' }} src={playlist.snippet.thumbnails.high.url} alt="{playlist.snippet.title}" width={300} height={225} />

        <Stack direction="row" alignItems="center" spacing={1}>

          <Typography sx={{
            width: '100%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
          ><span>{playlist.snippet.title}</span></Typography>

          <IconButton aria-label="delete" size="sm">
            <FileDownload fontSize="inherit" />
          </IconButton>
          {/*<Button loading variant="soft">Download</Button>*/}
        </Stack>
      </Box>
    </Link>
  </div>


};

export default Playlist;