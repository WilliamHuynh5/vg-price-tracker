// server/index.js
import fetch from "node-fetch";
import express from 'express';
import cors from 'cors';
import fs from 'fs'
const PORT = 5001
const app = express()
const apiKey = '75be90f5aa3e4c72b3bbc2ee6a551e45'

const ps5 = '187';
const ps4 = '18'
const nSwitch = '7'
const p_ps = '2'
const p_sw = '7'

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.post("/util/dump", (req, res) => {
  
  var data = JSON.stringify(req.body)
  fs.writeFile('./tracked_games.json', data, (err) => {
    if (err) {
      throw err;
    }
  });
});

app.get("/util/fetch", (req, res) => {
  fs.readFile('./tracked_games.json', (err, data) => {
    if (err) {
      throw err;
    }
    try {
      const payload = JSON.parse(data.toString());
      console.log(payload)
      res.json(payload);
    }
    catch {
      res.json({});
    }
  });
});

app.post("/game/query/title", async (req, res) => {

  const title = req.body.gameTitle
  const details = req.body.gameDetail

  var qPlatforms = ''
  var pPlatforms = ''
  if (details.platforms.includes('ps5')){
    qPlatforms += (ps5 + ',')
    pPlatforms += p_ps
  }
  if (details.platforms.includes('ps4')){
    qPlatforms += (ps4 + ',')
    pPlatforms += p_ps
  }
  if (details.platforms.includes('switch')){
    qPlatforms += (nSwitch + ',')
    pPlatforms += p_sw
  }

  qPlatforms = qPlatforms.slice(0, -1)
  console.log(qPlatforms)
  console.log(pPlatforms)
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  await fetch('https://api.rawg.io/api/games?search=' + title + '&search_precise=true' + '&parent_platforms=' + pPlatforms + '&platforms=' + qPlatforms + '&key=' + apiKey, options)
  .then(resp => resp.json())
  .then(({results}) => {
    console.log(results)
    res.json(results[0])
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

