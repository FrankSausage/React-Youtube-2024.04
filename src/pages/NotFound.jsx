import React from "react";
import { Box, Typography } from '@mui/material/';

export default function NotFound() {
  return (
    <Box style={{margin: '20px'}}>
      <Typography>Page Not Found!</Typography>
      <img src='/img/not-found.svg' alt='error' />
    </Box>
  )
}