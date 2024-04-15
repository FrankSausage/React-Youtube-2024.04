import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Paper, InputBase, Divider, Stack, IconButton, Grid, Avatar, Button} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import { useAuthContext } from "../context/AuthContext";


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
    const { user, logout } = useAuthContext();
  return (
    <Stack direction={"row"} sx={{alignItems: 'center'}} spacing={2}>
      <Grid container>
        <Grid item xs={3}>
          <Link to='/' style={{ textDecoration: "none", color: "black", marginLeft: 40,}}>
            <Stack direction={"row"} sx={{alignItems: 'center', marginLeft: 4}} spacing={1}>
            <YouTubeIcon sx={{color: "#ff0000"}} fontSize="large" />
            <Typography variant="h5" sx={{fontWeight: 'bold'}}>YouTube</Typography>
            </Stack>
          </Link>
        </Grid>
        <Grid item xs={5}>
          <Paper
            component="form" onSubmit={handleSubmit} onClick={handleSubmit}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', 
                  width: 500, ml: 6, mt: 1}}
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
        </Grid>
        <Grid item xs={4}>
          <Stack direction={'row'} spacing={1} sx={{justifyContent: 'right', alignItems:'center', mt: 1}}>
            { user && <Link to='/videos/record'>시청기록</Link> }
            { user && user.photoURL && (
              <Avatar src={user.photoURL} alt={user.displayName} height='32' />
            )}
            { user && <Typography>{user.displayName}</Typography> }
            { user && <Button onClick={logout}>로그아웃</Button> }
            { !user && <Link to='/signIn'>로그인</Link> }
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}