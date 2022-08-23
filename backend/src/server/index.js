// server/index.js
import fetch from "node-fetch";
import express from 'express';
import cors from 'cors';
import { apiKey, PORT, ps5, ps4, nSwitch, p_ps, p_sw } from "./config.js";
import {get_tracked_games, set_tracked_games, get_cached_games, set_cached_games} from "../data/dataStore.js";

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
  const title = req.body.gameTitle
  const details = req.body.gameDetail
  // fs.readFile('./tracked_games.json', (err, data) => {
  //   if (err) {
  //     throw err;
  //   }
  //   try {
  //     const database = JSON.parse(data.toString());
  //     if (title in database) {
  //       console.log(title + ' already exists! Skipping to save processing time!')
  //       return
  //     }
  //   } catch {
  //     console.log("Failed to read JSON")
  //     return
  //   }
  // });
  var qPlatforms = ''
  var pPlatforms = ''
  if (details.platforms.includes('ps5') || details.platforms.includes('ps4')){
    qPlatforms += (ps5 + ',')
    pPlatforms += p_ps
  } else if (details.platforms.includes('ps4')){
    qPlatforms += (ps4 + ',')
    pPlatforms += p_ps
  }
  if (details.platforms.includes('switch')){
    qPlatforms += (nSwitch + ',')
    pPlatforms += p_sw
  }

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch('https://api.rawg.io/api/games?search=' + title + '&search_precise=true' + 
  '&parent_platforms=' + pPlatforms + 
  // '&platforms=' + qPlatforms + 
  '&key=' + apiKey, options)
  .then(resp => resp.json())
  .then(({results}) => {
    // console.log(results[0].name);
    res.json(results[0])
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

