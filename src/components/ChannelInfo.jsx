import React from "react";
import { useChannelInfo } from "../api/youtube";
import { Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ChannelInfo({id, name}) {
  const { url } = useChannelInfo(id);
  return (
    <Stack direction={'row'} sx={{alignItems: 'center'}} spacing={1}>
        {url && <img src={url} style={{borderRadius: '50%', width: 40, height: 40}} alt={name} />}
        <Stack>
          <Typography>{name}<CheckCircleIcon sx={{color: "#747373", fontSize: 15, marginLeft: 0.5}}/></Typography>
          <Typography variant="subtitle2" color="text.secondary">구독자 100만명</Typography>
        </Stack>
    </Stack>
  )
}