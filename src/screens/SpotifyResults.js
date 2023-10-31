import { Button, Typography, Stack, Container } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import NutritionFacts from "../components/NutritionFacts";
import html2canvas from 'html2canvas';
import { GREEN_COLOR } from "../utils/constants";
import { Download } from "@mui/icons-material";

const SpotifyResults = ({ token, logout }) => {
  const [tracks, setTracks] = useState(null);
  const [artists, setArtists] = useState(null);
  const [profile, setProfile] = useState(null);
  const [timeRange, setTimeRange] = useState('short_term');
  const imageRef = useRef();

  const handleDownloadImage = async () => {
    const element = imageRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'Spotify-Nutrition-Facts.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  useEffect(() => {
    const args = new URLSearchParams({
      time_range: timeRange,
      limit: 10,
    });

    // PROFILE
    axios('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response =>
      setProfile(response.data)
    ).catch(error => console.log(error))

    // TRACKS
    axios(
      'https://api.spotify.com/v1/me/top/tracks?' + args, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then(response =>
      setTracks(response.data.items)
    ).catch(error => console.log(error));

    // ARTISTS
    axios(
      'https://api.spotify.com/v1/me/top/artists?' + args, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then(response =>
      setArtists(response.data.items)
    ).catch(error => console.log(error));

  }, [timeRange, token])

  return (
    <>
      <br />
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h5'>
        📝 Results
        </Typography>
        <Button variant="outlined" onClick={logout} color='error'>Logout</Button>
      </Stack>
      <Typography mt={1}>
        {/* ⚠️ Currently, the app is still in development mode with Spotify's web API, which means that I will have to invite your email to the app to be able to connect your account with Spotify. Howeverrr, currently this publicly works with LastFM accounts. Please try with your LastFM account! :D */}
        {/* <div style={{height: '12px'}}/>  */}
        ✨ Here are your results! You can gather information on your top-streamed songs and artists in three different time frames: within the last month, the last 6 months, or all-time. Click the 'Download Image' button to share your stats online. :D
      </Typography>
      <br/>
      <Container disableGutters justifyContent='center'>
        <Stack direction='row' columnGap={2}>
          <Button
            variant='outlined'
            onClick={() => setTimeRange('short_term')}
            sx={{
              borderColor: 'black',
              backgroundColor: timeRange === 'short_term' ? 'black' : 'white',
              color: timeRange === 'short_term' ? 'white' : 'black',
              whiteSpace: 'nowrap',
              '&:hover': {
                borderColor: GREEN_COLOR,
                backgroundColor: GREEN_COLOR,
                color: 'white'
              }
            }}
          >
            4 Weeks
          </Button>
          <Button
            variant='outlined'
            onClick={() => setTimeRange('medium_term')}
            sx={{
              borderColor: 'black',
              backgroundColor: timeRange === 'medium_term' ? 'black' : 'white',
              color: timeRange === 'medium_term' ? 'white' : 'black',
              whiteSpace: 'nowrap',
              '&:hover': {
                borderColor: GREEN_COLOR,
                backgroundColor: GREEN_COLOR,
                color: 'white'
              }
            }}
          >
            6 Months
          </Button>
          <Button
            variant='outlined'
            onClick={() => setTimeRange('long_term')}
            sx={{
              borderColor: 'black',
              backgroundColor: timeRange === 'long_term' ? 'black' : 'white',
              color: timeRange === 'long_term' ? 'white' : 'black',
              whiteSpace: 'nowrap',
              '&:hover': {
                borderColor: GREEN_COLOR,
                backgroundColor: GREEN_COLOR,
                color: 'white'
              }
            }}
          >
            All-Time
          </Button>
        </Stack>
        <br />
        <Button
          variant='contained'
          onClick={handleDownloadImage}
          sx={{
            backgroundColor: GREEN_COLOR,
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'black'
            }
          }}
        >
          <Download sx={{ marginRight: 1 }} /> Download Image
        </Button>
        <br />
        <br />
        <NutritionFacts profile={profile} tracks={tracks} artists={artists} timeRange={timeRange} ref={imageRef} />
        <br />
        <br />
        <Typography variant='caption'>
          Made by <a href='https://mhartenorio.com' target='_blank' rel="noreferrer">Mhar Tenorio</a> :D
        </Typography>
      </Container>
    </>
  )
}

export default SpotifyResults;