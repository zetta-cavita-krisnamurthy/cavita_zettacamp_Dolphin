const SongModel = require('./models/song.model');
const PlaylistModel = require('./models/playlist.model');
const DataLoader = require('dataloader');

const playlistLoader = new DataLoader(async (playlistIds) => {
  const playlist = await PlaylistModel.find({ _id: { $in: playlistIds } });
  const playlistMap = {};
  playlist.forEach((playlist) => {
    playlistMap[playlist._id] = playlist;
  });
  return playlistIds.map((playlistId) => playlistMap[playlistId]);
});

const songLoader = new DataLoader(async (songIds) => {
  const songs = await SongModel.find({ _id: { $in: songIds } });
  const songsMap = {};
  songs.forEach((song) => {
    songsMap[song._id] = song;
  });
  return songIds.map((songId) => songsMap[songId]);
});

module.exports = { songLoader, playlistLoader };