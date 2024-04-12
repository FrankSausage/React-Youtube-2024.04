import React from "react";
import SmallVideoCard from "./SmallVideoCard";
import { useRelatedVideo } from "../api/youtube";
import { Stack, Box, Divider, Typography } from '@mui/material';

export default function RelatedVideos({ id }) {
  const { isLoading, error, videos } = useRelatedVideo(id);
  return (
    <Box>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography variant="h1">Got Some Error!</Typography>}
      {videos && (
      <Box>
        <Typography variant="h6" sx={{textAlign: 'center'}}>연관 동영상</Typography>
        <Divider sx={{my: 1}} />
        {
          videos.map((video, idx) => 
          <Stack key={idx}>
            <SmallVideoCard video={video} />
          </Stack>  
          )
        }
      </Box>
      )}
    </Box>
  )
}