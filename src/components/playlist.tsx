import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Videos from './videos';
import { DatabaseSliceCallers } from '../infrastructure/database/callers';
import { dbSlices } from '../infrastructure/database/constants';

const playlistsWatchlistCallers = new DatabaseSliceCallers(dbSlices.PLAYLISTS_WATCHLIST).getCallers();

const Playlist = ({ playlist }) => {
  const [isWatched, setIsWatched] = useState(false)

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

  return <div key={playlist.id}>
    <img src={playlist?.snippet?.thumbnails?.high?.url} alt={playlist?.snippet?.title} />
    <Link to={playlist.id}>
      <h3>{playlist?.snippet?.title}</h3>
    </Link>

    {isWatched}

    <button onClick={toggleAddWToWatchlist}>{isWatched ? 'Remove From Download Watchlist' : 'Add To Download Watchlist'}</button>

    <br />
    <br />
    <br />
    <br />
  </div>

};

export default Playlist;