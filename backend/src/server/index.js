// server/index.js

const express = require("express");
const cors = require("cors")
const PORT = 5001
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
var fs = require('fs');

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
    const payload = JSON.parse(data.toString());
    console.log(payload)
    res.json(payload);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

