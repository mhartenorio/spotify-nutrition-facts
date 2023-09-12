import { Button, Typography } from "@mui/material";
import React from "react";
import { requestUserAuth } from "../utils/auth";
import headerImage from '../images/nutrition-facts-header-wider.png'
import { GREEN_COLOR } from "../utils/constants";

const HomeScreen = () => {
  return (
    <>
      {/* <img 
        src={headerImage}
        style={{
          width: '100%',
          margin: '16px 0px'
        }}
      /> */}
      <Typography >
        📝 Inspired by Receiptify, this app generates an image of the user's <b>Top Tracks and Top Artists</b> based on their Spotify listening activity in the style of a Nutrition Facts label. <div style={{height: '12px'}}/> ✳️ All information is imported from Spotify using their web API. By choosing to use this app, you agree to the use of your Spotify account username and data for your top artists and tracks. I do NOT collect, store, or share any important data from this and all information is solely displayed.  If you would like to revoke this app's permissions, you can visit your apps page on Spotify and click "Remove Access" on "My Music Diet". Please visit this link to <a href='https://support.spotify.com/us/article/spotify-on-other-apps/'>learn more</a>.   
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
        Log in with Spotify
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