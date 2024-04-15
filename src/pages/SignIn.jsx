import React, { useState } from "react";
import { Box, Button, TextField, Typography, } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { login, loginWithGithub } from "../api/firebase";

export default function SignIn () {
  const [userInfo, setUserInfo] = useState({email:'', password:''});
  const navigate = useNavigate();

    const handleChange = e => {
      setUserInfo({...userInfo, [e.target.name]: e.target.value});
    }
    const handleSubmit = e => {
      e.preventDefault(); 
      if(userInfo.password.length <= 5){
        alert('비밀번호는 최소 6자리 이상이여야 합니다.')
        return;
      } else {
        login(userInfo);
        navigate('/');
      }
    }
    const handleGithub = () => {
      loginWithGithub();
      navigate('/');
    }
    return (
        <Box>
          <form onSubmit={handleSubmit}>
            <TextField type="email" name="email" value={userInfo.email} placeholder="이메일 입력..." onChange={handleChange} autoFocus /><br />
            <TextField type="password" name="password" value={userInfo.password} placeholder="비밀번호 입력..." onChange={handleChange} required /><br />
            <Button type="submit">로그인</Button>
          </form>
          <Typography>아직 계정이 없으신가요?</Typography>
          <Link to='/signUp'>사용자 등록</Link>
          <Button onClick={handleGithub}>깃허브 로그인</Button>
        </Box>
    );
}