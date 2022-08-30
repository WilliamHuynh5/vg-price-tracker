// server/index.js
import express from 'express';
import cors from 'cors';
import { PORT } from "./config.js";
import { get_tracked_games, set_tracked_games } from "../data/dataStore.js";
import { query_game_title } from "../query/game.js";
import { auth_login, auth_logout, auth_register } from '../auth/auth.js';
import { addGame, getGames, removeGame } from '../user/user.js';

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post("/auth/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  res.json(auth_login(email, password));
});

app.post("/auth/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirmPassword;
  res.json(auth_register(email, password, confirm_password));
});

app.post("/auth/logout", async (req, res) => {
  const token = req.body.token;
  res.json(auth_logout(token));
});

app.post("/user/add/game", async (req, res) => {
  const token = req.headers.token;
  const gameObj = req.body.resp;
  const platforms = req.body.platforms;
  const physicalFlag = req.body.physicalFlag;
  const digitalFlag = req.body.digitalFlag;

  res.json(addGame(token, gameObj, platforms, physicalFlag, digitalFlag));
});

app.get("/user/get/games", async (req, res) => {
  const token = req.headers.token;
  res.json(getGames(token));
});

app.delete("/user/delete/game", async (req, res) => {
  const token = req.headers.token;
  const gameId = req.query.gameId;
  res.json(removeGame(token, parseInt(gameId)));
});

app.get("/data/get/tracked/games", (req, res) => {
  res.json(get_tracked_games());
});

app.post("/data/set/tracked/games", (req, res) => {
  const data = JSON.stringify(req.body);
  res.json(set_tracked_games(data));
});

app.get("/data/get/cached/games", (req, res) => {
  res.json(get_cached_games());
});

app.post("/data/set/cached/games", (req, res) => {
  const data = JSON.stringify(req.body);
  res.json(set_cached_games(data));
});


app.post("/game/query/title", async (req, res) => {
  const title = req.body.gameTitle;
  const platforms = req.body.platforms;
  console.log("plat: " + platforms);
  query_game_title(title, platforms).then(response => res.json(response));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

