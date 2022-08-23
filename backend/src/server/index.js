// server/index.js
import express from 'express';
import cors from 'cors';
import { PORT } from "./config.js";
import { get_tracked_games, set_tracked_games, get_cached_games, set_cached_games} from "../data/dataStore.js";
import { query_game_title } from "../query/game.js";

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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
  const details = req.body.gameDetail;
  query_game_title(title, details).then(response => res.json(response));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

