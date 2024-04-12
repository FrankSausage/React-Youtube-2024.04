import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';
import { Typography, Box, Grid } from '@mui/material';

export default function VideosDetail() {
  const { state: {video} } = useLocation();
  const { title, channelId, channelTitle, description} = video.snippet;
  const videoIdUri = typeof(video.id) === 'string' ? video.id : video.id.videoId;
  return (
    <Grid container spacing={3} sx={{mt: 1}}>
      <Grid item xs={9} md={8}>
        {/* 동영상 */}
        <Box sx={{paddingTop: '53%', height: 0, width: '100%', position: 'relative'}}>
          <iframe id='player' type='text/html' width={'100%'} height={'100%'} style={{position: 'absolute', top: 0, left: 0, borderRadius: '2%'}}
            src={`https://www.youtube.com/embed/${videoIdUri}`} title={title} />
        </Box>
        <Box sx={{mt: 1}}>
          {/* 동영상 설명 */}
          <Typography variant="h5">{title}</Typography>
          <ChannelInfo id={channelId} name={channelTitle} />
          <Typography variant="caption" color="text.secondary">{description}</Typography>
        </Box>
      </Grid>
      <Grid item xs={9} md={4}> 
        {/* 연관 동영상 */}
        <RelatedVideos id={channelId} />
      </Grid>
    </Grid>
  )
}