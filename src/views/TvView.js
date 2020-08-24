import React from 'react'
import ChannelList from '../components/ChannelList'
import TVPlayer from '../components/TVPlayer';

export default function TvView(props) {
  return (
    <div className="view tvview">
      <TVPlayer />
      <ChannelList />
    </div>
  )
}
