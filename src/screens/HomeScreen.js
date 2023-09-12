import { Button, Typography } from "@mui/material";
import React from "react";
import { requestUserAuth } from "../utils/auth";
import headerImage from '../images/nutrition-facts-header-wider.png'
import { LibraryMusic } from "@mui/icons-material";
import { GREEN_COLOR } from "../utils/constants";

const HomeScreen = () => {
  return (
    <>
      <img 
        src={headerImage}
        style={{
          width: '100%',
          margin: '16px 0px'
        }}
      />
      <Typography >
        📝 Inspired by Receiptify, this app generates an image of the user's Top Tracks and Top Artists based on their Spotify listening activity in the style of a Nutrition Facts label. All information is imported from Spotify and I do NOT collect or store any important data from this.  
      </Typography>
      <Button 
        onClick={requestUserAuth} 
        variant='contained'
        sx={{
          mt: 2,
          background: 'black',
          '&:hover': {
            background: GREEN_COLOR
          }
        }}
      >
        <LibraryMusic sx={{mr: 2}} /> Log in with Spotify
      </Button>
      <br/>
      <br/>
      <Typography variant='caption'>
        👋 Made by <a href='https://mhartenorio.com' target='_blank'>Mhar Tenorio</a> :D
      </Typography>
    </>
  )
}

export default HomeScreen;