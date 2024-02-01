import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Grid
} from "@mui/material";
import { RED_COLOR, GREEN_COLOR } from "../utils/constants";
import NutritionFacts from "../components/NutritionFacts";
import html2canvas from 'html2canvas';
import { Download } from "@mui/icons-material";

const periodOptions = [
  {
    value: 'overall',
    name: 'All Time'
  },
  {
    value: '7day',
    name: '7 Days'
  },
  {
    value: '1month',
    name: '1 Month'
  },
  {
    value: '3month',
    name: '3 Months'
  },
  {
    value: '6month',
    name: '6 Months'
  },
  {
    value: '12month',
    name: '12 Months'
  },
]

const LastFMResults = ({ setIsLastFM }) => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [period, setPeriod] = useState({
    value: '7day',
    name: '7 Days'
  });
  const [tracks, setTracks] = useState(null);
  const [artists, setArtists] = useState(null);
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
    if (submittedUsername === '') return;
    const tracksArgs = new URLSearchParams({
      method: 'user.gettoptracks',
      user: submittedUsername,
      period: period.value,
      limit: 10,
      api_key: 'b5293c8aed0bfe6ad008d99f31d88afc',
      format: 'json'
    });

    //.external_urls.spotify
    // TRACKS
    axios(
      'https://ws.audioscrobbler.com/2.0/?' + tracksArgs, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      const trackResponse = response.data.toptracks.track;
      trackResponse.forEach((track, i) => {
        trackResponse[i] = {
          name: track.name,
          artists: [{name: track.artist.name}],
          duration_ms: Number(track.duration) * 1000, // Convert to milliseconds
          external_urls: {
            spotify: track.url
          }
        }
      })
      setTracks(trackResponse);
    }
    ).catch(error => console.log(error));

    // ARTISTS
    const artistsArgs = new URLSearchParams({
      method: 'user.gettopartists',
      user: submittedUsername,
      period: period.value,
      limit: 10,
      api_key: 'b5293c8aed0bfe6ad008d99f31d88afc',
      format: 'json'
    });
    axios(
      'https://ws.audioscrobbler.com/2.0/?' + artistsArgs, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      const artistResponse = response.data.topartists.artist;
      artistResponse.forEach((artist, i) => {
        artistResponse[i] = {
          name: artist.name,
          popularity: Number(artist.playcount),
          external_urls: {
            spotify: artist.url
          }
        }
      });
      setArtists(artistResponse);
    }
    ).catch(error => console.log(error));
  }, [submittedUsername, period])

  return (
    <div>
      <br />
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h5'>
          📝 Results
        </Typography>
        <Button variant="outlined" onClick={() => setIsLastFM(false)} color='error'>Go Back</Button>
      </Stack>
      <Divider sx={{ margin: '16px 0px' }} />
      <Typography mb={1}>
        To start, type your LastFM username below:
      </Typography>
      <Stack direction='row' columnGap={2}>
        <TextField label="Username" onChange={(e) => setUsername(e.target.value)} size='small' />
        <Button variant='contained' onClick={() => setSubmittedUsername(username)} sx={{ backgroundColor: 'black' }}>
          Submit
        </Button>
      </Stack>
      <Divider sx={{ margin: '16px 0px' }} />
      {submittedUsername && (
        <>
          <Grid container rowGap={2} justifyContent='space-evenly'>
            {periodOptions.map((periodOption) => {
              return (
                <Grid item key={periodOption.value}>
                  <Button
                    variant='outlined'
                    onClick={() => setPeriod(periodOption)}
                    sx={{
                      borderColor: 'black',
                      backgroundColor: period.value === periodOption.value ? 'black' : 'white',
                      color: period.value === periodOption.value ? 'white' : 'black',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        borderColor: RED_COLOR,
                        backgroundColor: RED_COLOR,
                        color: 'white'
                      }
                    }}
                  >
                    {periodOption.name}
                  </Button>
                </Grid>
              )
            })}
          </Grid>
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
          <NutritionFacts
            tracks={tracks}
            artists={artists}
            profile={{ id: submittedUsername }}
            timeRange={period.name}
            isLastFM={true}
            ref={imageRef}
          />
        </>
      )}
    </div>
  )
}

export default LastFMResults;