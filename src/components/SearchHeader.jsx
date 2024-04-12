import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Paper, InputBase, Divider, Stack, IconButton} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchHeader() {
    const { keyword } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        navigate(`/videos/${text}`);
    }
    useEffect(() => {
        setText(keyword || '');
    }, [keyword]);
  return (
    <Stack direction={"row"} sx={{alignItems: 'center'}} spacing={2}>
        <Link to='/' style={{ textDecoration: "none", color: "black", marginLeft: 40,}}>
            <Stack direction={"row"} sx={{alignItems: 'center'}} spacing={1}>
            <YouTubeIcon sx={{color: "#ff0000"}} fontSize="large" />
            <Typography variant="h5" sx={{fontWeight: 'bold'}}>YouTube</Typography>
            </Stack>
        </Link>
        <Paper
            component="form" onSubmit={handleSubmit} onClick={handleSubmit}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 700,}}
            style={{marginLeft: 120}}
            >
            <InputBase
                sx={{ ml: 1, flex: 1, }}
                placeholder="검색..."
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    </Stack>
  )
}