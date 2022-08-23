import fs from 'fs';
let tracked_games = {};
let cached_games = {};
const tracked_games_path = 'src/data/tracked_games.json';

export function get_tracked_games() {
  tracked_games = load_data(tracked_games_path);
  console.log(tracked_games);
  return tracked_games;
}

export function set_tracked_games(data) {
  tracked_games = data;
  save_data(tracked_games_path, tracked_games);
}

export function get_cached_games() {
  cached_games = load_data('./cached_games.json');
  return cached_games;
}

export function set_cached_games(data) {
  cached_games = data;
  save_data('./cached_games.json', cached_games);
}

export function save_data(file_path, data) {
  fs.writeFileSync(file_path, data);
}

export function load_data(file_path) {
  let data = fs.readFileSync(file_path);
  return JSON.parse(data.toString());
}
