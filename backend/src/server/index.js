// server/index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { get_tracked_games, set_tracked_games } from "../data/dataStore.js";
import { query_game_title, query_game_price, query_game_track } from "../query/query.js";
import { auth_login, auth_logout, auth_register } from '../auth/auth.js';
import { addGame, getGames, removeGame } from '../user/user.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const frontendPath = path.join(__dirname, '..', '..', '..', 'frontend');
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(frontendPath, "/build")));


app.post("/api/auth/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('log ' + email + ' ' + password);
  res.json(auth_login(email, password));
});

app.post("/api/auth/register", async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirmPassword;
  console.log('reg ' + email + ' ' + password);
  res.json(auth_register(email, password, confirm_password));
});

app.post("/api/auth/logout", async (req, res) => {
  const token = req.body.token;
  res.json(auth_logout(token));
});

app.post("/api/user/add/game", async (req, res) => {
  const token = req.headers.token;
  const gameObj = req.body.resp;
  const platforms = req.body.platforms;
  const physicalFlag = req.body.physicalFlag;
  const digitalFlag = req.body.digitalFlag;

  res.json(addGame(token, gameObj, platforms, physicalFlag, digitalFlag));
});

app.get("/api/user/get/games", async (req, res) => {
  const token = req.headers.token;
  res.json(getGames(token));
});

app.delete("/api/user/delete/game", async (req, res) => {
  const token = req.headers.token;
  const gameId = req.query.gameId;
  res.json(removeGame(token, parseInt(gameId)));
});

app.get("/api/data/get/tracked/games", (req, res) => {
  res.json(get_tracked_games());
});

app.post("/api/data/set/tracked/games", (req, res) => {
  const data = JSON.stringify(req.body);
  res.json(set_tracked_games(data));
});

app.get("/api/data/get/cached/games", (req, res) => {
  res.json(get_cached_games());
});

app.post("/api/data/set/cached/games", (req, res) => {
  const data = JSON.stringify(req.body);
  res.json(set_cached_games(data));
});


app.post("/api/game/query/title", async (req, res) => {
  console.log(req.body);
  const title = req.body.gameTitle;
  const platforms = req.body.platforms;
  query_game_title(title, platforms).then(response => res.json(response));
});

app.post("/api/game/query/track", async (req, res) => {
  const title = req.body.gameTitle;
  const platforms = req.body.gamePlatforms;
  const digFlag = req.body.digitalPref;
  const physFlag = req.body.physicalPref;
  const retailPrefs = req.body.retailPrefs;
  query_game_track(title, platforms, digFlag, physFlag, retailPrefs).then(response => res.json(response));
});

app.post("/api/game/query/price", async (req, res) => {
  const gameTitle = req.body.gameTitle;
  res.json(query_game_price(gameTitle));
});


app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {

  console.log(`Listening on port ${port}`);

});



