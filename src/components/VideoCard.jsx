import React from "react";
import { useChannelInfo } from "../api/youtube";
import { Form, useNavigate, } from "react-router-dom";
import { Stack, Avatar, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimeAgo from 'react-timeago';
import krString from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

export default function VideoCard({ video }) {
    const {title, thumbnails, channelId ,channelTitle, publishedAt, description} = video.snippet;
    const { url } = useChannelInfo(channelId);
    const navigate = useNavigate();
    const videoIdUri = typeof(video.id) === 'string' ? video.id : video.id.videoId;
  return (
    <Stack>
        <Form onClick={e => navigate(`/videos/watch/${videoIdUri}`, {state: {video}})}>
            <Stack direction={'row'} spacing={3} sx={{marginTop: 5, cursor: 'pointer'}}>
                <img src={thumbnails.standard ? thumbnails.standard.url : thumbnails.high.url } 
                    style={{borderRadius: '5%', maxWidth:480, maxHeight:360}}
                    alt="Thumbnail Images"
                />
                <Stack spacing={1} style={{marginTop: 5}}>
                    <Typography variant="h6" gutterBottom>{title}</Typography>
                    <Typography color="text.secondary" sx={{display: 'inline-flex'}}>
                        <Avatar src={url} sx={{width:24, height:24, display: 'inline-block', marginRight: 1}} />                        
                        <Typography>{channelTitle}</Typography>
                        <CheckCircleIcon sx={{fontSize: 15, marginLeft: 0.5, pt: 0.5}} />
                    </Typography>
                    <Typography color="text.secondary" sx={{fontSize: 15}}>
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