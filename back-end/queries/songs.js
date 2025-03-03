const db = require("../db/dbConfig");

//INDEX
const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs;");
    return allSongs;
  } catch (error) {
    throw error;
  }
};

//ONE song
const getASong = async (id) => {
  try {
    const oneSong = await db.oneOrNone("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return { error: error };
  }
};

// CREATE/NEW
const createSong = async (song) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
    return newSong;
  } catch (error) {
    throw error;
  }
};

//DELETE
const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      id
    );
    return deletedSong;
  } catch (error) {
    return error;
  }
};

//UPDATE/EDIT
const updateSong = async (id, song) => {
  try {
    const { name, artist, album, time, is_favorite } = song;
    const updatedSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4,is_favorite=$5 WHERE id=$6 RETURNING *",
      [name, artist, album, time, is_favorite, id]
    );
    return updatedSong;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllSongs,
  getASong,
  createSong,
  deleteSong,
  updateSong,
};