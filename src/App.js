import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { requestAccessToken, fetchProfile, requestUserAuth } from './utils/auth';
import { Button, Container } from '@mui/material';
import { AUTHORIZE_URL } from './utils/constants';
import MainMenu from './screens/MainMenu';

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
        {!token ?
          <Button onClick={requestUserAuth}>Log in with Spotify</Button>
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
