import React from "react";
import LastFMResults from "./LastFMResults";
import SpotifyResults from "./SpotifyResults";

const MainMenu = ({ token, logout, isLastFM, setIsLastFM }) => {


  return (
    <>
      {isLastFM ? (
        <LastFMResults setIsLastFM={setIsLastFM} />
      ) : (
        <SpotifyResults
          token={token}
          logout={logout}
        />
      )
      }
    </>
  )
}

export default MainMenu;