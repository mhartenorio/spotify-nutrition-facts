import { Button, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import NutritionFacts from "../components/NutritionFacts.tsx";

const MainMenu = ({ token, logout }) => {
  const [tracks, setTracks] = useState(null);
  const [artists, setArtists] = useState(null);
  const [profile, setProfile] = useState(null);
  const [timeRange, setTimeRange] = useState('short_term')

  useEffect(() => {
    const args = new URLSearchParams({
      time_range: timeRange,
      limit: 10,
    });
    const profile = axios('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response =>
      setProfile(response.data)
    ).catch(error => console.log(error))


    const tracksResponse = axios(
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

    const artistsResponse = axios(
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

  }, [timeRange])

  return (
    <>
      <Typography variant='h3'>
        Results
      </Typography>
      <br />
      <Button variant="contained" onClick={logout}>Logout</Button>
      <br />
      <br />
      <Stack direction='row' columnGap={2}>
        <Button variant='outlined' onClick={() => setTimeRange('short_term')}>
          4 Weeks
        </Button>
        <Button variant='outlined' onClick={() => setTimeRange('medium_term')}>
          6 Months
        </Button>
        <Button variant='outlined' onClick={() => setTimeRange('long_term')}>
          All-Time
        </Button>
      </Stack>
      <br />
      <br />
      <NutritionFacts profile={profile} tracks={tracks} artists={artists} timeRange={timeRange} />
    </>
  )
}

export default MainMenu;