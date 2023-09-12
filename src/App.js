import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { requestAccessToken, fetchProfile, requestUserAuth } from './utils/auth';
import { Typography, Container } from '@mui/material';
import { AUTHORIZE_URL } from './utils/constants';
import MainMenu from './screens/MainMenu';
import HomeScreen from './screens/HomeScreen';

function App() {
  const [token, setToken] = useState("");
  const [code, setCode] = useState("")

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
    <div className="App">
      <Container maxWidth='md'>
        <Typography variant='h3' fontWeight='bold' color={'#1db954'}>
          Spotify Nutrition Facts 🎧
        </Typography>
        <Typography variant='h5' fontWeight='bold'>
          Top Tracks and Top Artists Generator
        </Typography>
        {!token ?
          // <Button onClick={requestUserAuth}>Log in with Spotify</Button>
          <HomeScreen />
          :
          <MainMenu
            token={token}
            logout={logout}
          />
        }
      </Container>
    </div>
  );
}

export default App;
