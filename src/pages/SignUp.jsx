import React, { useState } from "react";
import { register, loginWithGithub } from '../api/firebase';
import { uploadImage } from "../api/cloudinary";
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp(){
    const [userInfo, setUserInfo] = useState({email:'', password:'', name:'', photo:''});
    const navigate = useNavigate();

      const handleChange = e => {
          setUserInfo({...userInfo, [e.target.name]: e.target.value});
      }
      const handleSubmit = e => {
          e.preventDefault();
          register(userInfo);
          navigate('/signIn');
      }
      const handleGithub = () => {
        loginWithGithub();
        navigate('/');
      }
      const handleUpload = e => {
        uploadImage(e.target.files && e.target.files[0])
          .then(url => setUserInfo({...userInfo, ['photo']: url}));
      }
    return(
        <Box>
            <form onSubmit={handleSubmit}>
                <InputBase type="email" name="email" value={userInfo.email} placeholder="이메일"
                    onChange={handleChange} autoFocus required /><br />
                <InputBase type="password" name="password" value={userInfo.password} placeholder="패스워드"
                    onChange={handleChange} required /><br />
                <InputBase type="text" name="name" value={userInfo.name} placeholder="이름"
                    onChange={handleChange} required /><br />
                <input type="file" accpet="image/*" name="file" onChange={handleUpload} required/>
                <Button onClick={handleSubmit}>사용자 등록</Button>
            </form>
            <Typography>이미 계정이 있으신가요?</Typography>
            <Link to='/signIn'>로그인 하기</Link><br />
            <Button onClick={handleGithub}>깃허브 로그인</Button>
        </Box>    
    )
}