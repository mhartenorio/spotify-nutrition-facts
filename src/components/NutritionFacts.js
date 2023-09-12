import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import millisToMinutesAndSeconds from "../utils/utils";

const NutritionFacts = forwardRef(({ profile, tracks, artists, timeRange }, ref) => {
  const [totalTime, setTotalTime] = useState('');

  const theme = createMuiTheme({
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
  }

  useEffect(() => {
    let time = 0;
    tracks && tracks.map((track) => {
      time += track.duration_ms;
    });
    setTotalTime(millisToMinutesAndSeconds(time));
  }, [timeRange, tracks])

  return (
    <MuiThemeProvider theme={theme}>
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
          15 servings per container
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
                  <Typography sx={{ fontSize: '16px' }}>
                    {track.name}
                  </Typography>
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
            <b>Popularity</b>
          </Typography>
        </Stack>

        {artists && artists.slice(0, 5).map(artist => {
          return (
            <>
              <Divider sx={{ backgroundColor: 'black' }} />
              <Grid container justifyContent='space-between'>
                <Grid item ml={2} xs={9}>
                  <Typography sx={{ fontSize: '16px' }}>
                    {artist.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <b>{artist.popularity}%</b>
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
          <b>Made with:</b> App URL Here
        </Typography>
        <Divider sx={{ backgroundColor: 'black', borderWidth: '4px', mb: 1, mt: 0.5 }} />
        <Typography variant='caption'>
          *The % Daily Value tells you how much a nutrient in a serving food contributes to a daily die. 2000 calories a day is used for general nutrition advice.
        </Typography>
      </Box>

    </MuiThemeProvider>
  )
})

export default NutritionFacts;