import React from "react";
import { Form, useNavigate, } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TimeAgo from 'react-timeago';
import krString from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function VideoCard({ video }) {
    const {title, thumbnails, channelTitle, publishedAt, description} = video.snippet;
    const navigate = useNavigate();
    if (typeof(video.id) !== 'string' && video.id.kind === 'youtube#channel'){
        return;
    }
    const videoIdUri = typeof(video.id) === 'string' ? video.id : video.id.videoId;

  return (
    <Stack>
        <Form onClick={e => navigate(`/videos/watch/${videoIdUri}`)}>
            <Stack direction={'row'} spacing={3} sx={{marginTop: 5}}>
                <img src={thumbnails.high.url} 
                style={{borderRadius: '5%', maxHeight: 360, maxWidth: 480,}} 
                />
                <Stack spacing={1} style={{marginTop: 5}}>
                    <Typography variant="h6" gutterBottom>{title}</Typography>
                    <Typography color="text.secondary">
                        <Avatar src={`https://picsum.photos/200/300?p=${video.id}`} sx={{width:24, height:24, display: 'inline-block', marginRight: 1}} />
                        {channelTitle}
                        <CheckCircleIcon sx={{fontSize: 15, marginLeft: 0.5}} />
                    </Typography>
                    <Typography color="text.secondary">
                        <TimeAgo date={publishedAt} formatter={buildFormatter(krString)} />
                    </Typography>
                    <Typography 
                        variant="caption" 
                        color="text.secondary"
                        style={{width: 480, overflow: 'hidden', textOverflow:"ellipsis", whiteSpace:'nowrap'}} 
                        gutterBottom
                    >
                        {description}
                    </Typography>
                </Stack>
            </Stack>
        </Form>
    </Stack>
  )
}