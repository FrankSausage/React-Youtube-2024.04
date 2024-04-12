import React from "react";
import { Form, useNavigate, } from "react-router-dom";
import { Stack, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimeAgo from 'react-timeago';
import krString from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';


export default function SmallVideoCard({ video }) {
    const {title, thumbnails, channelTitle, publishedAt} = video.snippet;
    const navigate = useNavigate();
    const videoIdUri = typeof(video.id) === 'string' ? video.id : video.id.videoId;
  return (
    <Stack sx={{mt: 1}}>
        <Form onClick={e => navigate(`/videos/watch/${videoIdUri}`, {state: {video}})}>
            <Stack direction={'row'} spacing={1} sx={{cursor: 'pointer'}}>
                <img src={thumbnails.medium.url} 
                    style={{borderRadius: '5%', maxHeight: 120, maxWidth: 180,}}
                    alt="Thumbnail Images"
                />
                <Stack>
                    <Typography variant="subtitle1" sx={{lineHeight: 1.2}}>{title}</Typography>
                    <Typography color="text.secondary" >
                        <Box>
                            <Typography variant="caption">{channelTitle}</Typography>
                            <CheckCircleIcon sx={{fontSize: 12, marginLeft: 0.5, verticalAlign: 'middle'}} />
                        </Box>
                    </Typography>
                    <Typography color="text.secondary" sx={{fontSize: 12}}>
                        <TimeAgo date={publishedAt} formatter={buildFormatter(krString)} />
                    </Typography>
                </Stack>
            </Stack>
        </Form>
    </Stack>
  )
}