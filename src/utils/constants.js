const CLIENT_ID = "be54291abf8e4786b0656cca45785fd6"
const REDIRECT_URI = "http://localhost:3000/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

export const AUTHORIZE_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope='user-top-read`;

export const GREEN_COLOR = '#1db954';
export const RED_COLOR = '#d51007';
