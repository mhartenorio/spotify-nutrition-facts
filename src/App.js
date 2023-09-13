import './App.css';
import { useEffect, useState } from 'react';
import { requestAccessToken } from './utils/auth';
import { Typography, Container } from '@mui/material';
import MainMenu from './screens/MainMenu';
import HomeScreen from './screens/HomeScreen';

function App() {
  const [token, setToken] = useState("");
  const [isLastFM, setIsLastFM] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const search = window.location.search.substring(1);
      let tokenStored = window.sessionStorage.getItem("token");
      if (!tokenStored && search) {
        let codeFromURL = search.split("&").find(elem => elem.startsWith("code")).split("=")[1];
        tokenStored = await requestAccessToken(codeFromURL);
        window.sessionStorage.setItem("token", tokenStored);
        window.location.search = '';
      }
      setToken(tokenStored);
    }
    fetchToken();

    return () => {
      logout();
    }
  }, [])

  const logout = () => {
    setToken("")
    window.sessionStorage.removeItem("token")
  }

  return (
    <Container maxWidth='md' disableGutters sx={{ 
      overflow: 'auto',
      padding: '36px'
    }}>
      <Typography variant='h3' fontWeight='bold' color={'#1db954'}>
       My Music Diet 🎧
      </Typography>
      <Typography variant='h5' fontWeight='bold'>
        Nutrition Facts for Spotify
      </Typography>
      {(!token && !isLastFM) ?
        <HomeScreen setIsLastFM={setIsLastFM} />
        :
        <MainMenu
          token={token}
          logout={logout}
          isLastFM={isLastFM}
          setIsLastFM={setIsLastFM}
        />
      }
    </Container>
  );
}

export default App;
