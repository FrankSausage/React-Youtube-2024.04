import React from "react";
import { useVideoInfo } from "../api/youtube";
import { useParams } from 'react-router-dom';
import VideoCard from "../components/VideoCard";
import { Stack, Box, Typography, Divider } from '@mui/material';

export default function Videos() {
  const { keyword } = useParams();
  const { isLoading, error, videos } = useVideoInfo(keyword);
  return (
    <Box style={{marginLeft: 50}}>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography variant="h1">Got Some Error!</Typography>}
      {videos && 
        <>
          <Divider style={{marginTop: 30}} />
          <Typography variant="h5" style={{marginTop: 15}}>{keyword ? keyword + ' 최신 동영상' : '인기 동영상'}</Typography>
          <Stack direction={'row'} useFlexGap flexWrap={'wrap'}>
            {videos.map((video, idx) => <VideoCard key={idx} video={video} />)}
          </Stack>
        </>
      }
    </Box>
  )
}