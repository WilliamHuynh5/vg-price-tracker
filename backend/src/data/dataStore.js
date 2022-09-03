import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let tracked_games = {};
let data = {
  users: [],
  games: {}
};
const tracked_games_path = 'src/data/tracked_games.json';
const data_path = __dirname + '/data.json';

// Getters and setters for games

export function get_tracked_games() {
  tracked_games = load_data(tracked_games_path);
  return tracked_games;
}

export function set_tracked_games(data) {
  tracked_games = data;
  save_data(tracked_games_path, tracked_games);
}

// Getters and setters for data

export function get_data() {
  data = load_data(data_path);
  return data;
}

export function set_data(newData) {
  data = newData;
  save_data(data_path, JSON.stringify(data));
}

// JSON Reading stuff

export function save_data(file_path, data) {
  fs.writeFileSync(file_path, data);
}

export function load_data(file_path) {
  let data = fs.readFileSync(file_path);
  return JSON.parse(data.toString());
}
