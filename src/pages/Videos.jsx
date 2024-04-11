import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import VideoCard from "../components/VideoCard";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`
const popularUri = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet`

export default function Videos() {
  const { keyword } = useParams();
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => {
      const uri = keyword ? keywordUri+keyword : popularUri;
      return axios
              .get(`/data/${keyword ? 'search' : 'popular'}.json`)
              // .get(uri)
              .then(res => res.data.items);
    }, staleTime: 1000 * 60 * 1,      // 1분, ms 단위
  });
  return (
    <div style={{marginLeft: 50}}>
      {isLoading && <p>Loading...</p>}
      {error && <h1>Got Some Error!</h1>}
      {videos && 
        <>
          <Divider style={{marginTop: 30}} />
          <Typography variant="h5" style={{marginTop: 15}}>{keyword ? keyword + ' 최신 동영상' : '인기 동영상'}</Typography>
          <Stack
            direction={'row'} spacing={5}
            useFlexGap flexWrap={'wrap'}
          >
            {videos.map((video, idx) => <VideoCard key={idx} video={video} />)}
          </Stack>
        </>
      }
    </div>
  )
}