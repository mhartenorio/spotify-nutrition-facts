import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SpotifyLogo from '../images/spotify-logo.png'

import millisToMinutesAndSeconds from "../utils/utils";

const NutritionFacts = forwardRef(({ profile, tracks, artists, timeRange, isLastFM }, ref) => {
  const [totalTime, setTotalTime] = useState('');

  const theme = createTheme({
    typography: {
      fontFamily: '"Helvetica Neue", sans-serif', // default Material-UI font
    },
  });

  let timeRangeText = '';
  switch (timeRange) {
    case ('short_term'):
      timeRangeText = '4 Weeks';
      break;
    case ('medium_term'):
      timeRangeText = '6 Months'
      break;
    case ('long_term'):
      timeRangeText = 'All Time';
      break;
    default:
      timeRangeText = timeRange;
      break;
  }

  useEffect(() => {
    let time = 0;
    tracks && tracks.forEach((track) => {
      time += track.duration_ms;
    });
    setTotalTime(millisToMinutesAndSeconds(time));
  }, [timeRange, tracks])

  return (
    <ThemeProvider theme={theme}>
      <Box ref={ref} sx={{
        border: '2px solid black',
        padding: 1,
        width: '348px',
        background: 'white',
      }}>
        <Typography sx={{ fontSize: '36px', fontWeight: 'bold' }}>
          Nutrition Facts
        </Typography>
        <Divider sx={{ backgroundColor: 'black' }} />
        <Typography sx={{ fontSize: '16px', mt: 1 }}>
          Top Tracks &amp; Artists
        </Typography>
        <Stack direction='row' justifyContent='space-between' mb={1}>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
            Serving Size
          </Typography>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
            {timeRangeText}
          </Typography>
        </Stack>
        <Divider sx={{ backgroundColor: 'black', borderWidth: '6px', mb: 1 }} />
        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
          Amount per serving
        </Typography>
        <Stack direction='row' justifyContent='space-between' mb={1} mt={-1}>
          <Typography sx={{ fontSize: '22px', fontWeight: 'bold' }}>
            Calories
          </Typography>
          <Typography sx={{ fontSize: '22px', fontWeight: 'bold' }}>
            {tracks && totalTime}
          </Typography>
        </Stack>
        <Divider sx={{ backgroundColor: 'black', borderWidth: '4px', mb: 1 }} />
        <Typography sx={{ fontSize: '22px', textAlign: 'right', mb: 1, fontWeight: 600 }}>
          % Daily Value*
        </Typography>
        <Divider sx={{ backgroundColor: 'black' }} />
        <Stack direction='row' justifyContent='space-between'>
          <Typography sx={{ fontSize: '16px' }}>
            <b>Top Tracks</b> 10g
          </Typography>
          <Typography sx={{ fontSize: '16px' }}>
            <b>{tracks && totalTime}</b>
          </Typography>
        </Stack>
        {tracks && tracks.map(track => {
          return (
            <>
              <Divider sx={{ backgroundColor: 'black' }} />
              <Grid container justifyContent='space-between'>
                <Grid item ml={2} xs={9}>
                  <a href={track.external_urls.spotify} target='_blank' rel="noreferrer" style={{ color: 'black', textDecoration: 'none' }}>
                    <Typography sx={{ fontSize: '16px', }}>
                      {track.name} - {track.artists[0].name}
                    </Typography>
                  </a>
                </Grid>
                <Grid item>
                  <b>{millisToMinutesAndSeconds(track.duration_ms)}</b>
                </Grid>
              </Grid>

            </>
          )
        })}
        <Divider sx={{ backgroundColor: 'black' }} />
        <Stack direction='row' justifyContent='space-between'>
          <Typography sx={{ fontSize: '16px' }}>
            <b>Top Artists</b> 5g
          </Typography>
          <Typography sx={{ fontSize: '16px' }}>
            <b>{isLastFM ? 'Play Count' : 'Popularity'}</b>
          </Typography>
        </Stack>

        {artists && artists.slice(0, 5).map(artist => {
          return (
            <>
              <Divider sx={{ backgroundColor: 'black' }} />
              <Grid container justifyContent='space-between'>
                <Grid item ml={2} xs={9}>
                  <a href={artist.external_urls.spotify} target='_blank' rel="noreferrer" style={{ color: 'black', textDecoration: 'none' }}>
                    <Typography sx={{ fontSize: '16px' }}>
                      {artist.name}
                    </Typography>
                  </a>
                </Grid>
                <Grid item>
                  <b>{artist.popularity}{isLastFM ? '' : '%'}</b>
                </Grid>
              </Grid>

            </>
          )
        })}

        <Divider sx={{ backgroundColor: 'black', borderWidth: '6px', mb: 0.5 }} />
        <Typography sx={{ fontSize: '16px', mb: 0.5 }}>
          <b>User:</b> {profile && profile.id}
        </Typography>
        <Divider sx={{ backgroundColor: 'black' }} />
        <Typography sx={{ fontSize: '16px', mt: 0.5 }}>
          <b>Made with:</b> mymusicdiet.netlify.app
        </Typography>
        <Divider sx={{ backgroundColor: 'black', borderWidth: '4px', mb: 1, mt: 0.5 }} />
        {isLastFM ?
          <Typography variant='caption'>
            *The % Daily Value tells you how much a nutrient in a serving food contributes to a daily diet. 2000 calories a day is used for general nutrition advice.
          </Typography>
          :
          <a href='https://spotify.com' target='_blank' rel="noreferrer">
            <Box
              component='img'
              src={SpotifyLogo}
              sx={{ width: '25%', objectFit: 'scale-down' }}
            />
          </a>
        }

      </Box>

    </ThemeProvider>
  )
})

export default NutritionFacts;