const { gql } = require('apollo-server-express');
const UserModel = require('./models/user.model');
const SongModel = require('./models/song.model');
const PlaylistModel = require('./models/playlist.model');
const {songLoader, playlistLoader} = require('./dataLoader');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'C4vtA-s3CreTkEy';
// const DataLoader = require('dataloader');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String! 
    firstName: String!
    lastName: String!
  }

  type Song {
    _id: ID!
    songTitle: String!
    singer: String! 
    duration: Int!
    genre: String!
    playlist: Playlist
    message: String
  }

  type Playlist {
    _id: ID!
    playlistName: String!
    songs: [Song!]!
    message: String
  }
  
  input UserInput {
    username: String!
    password: String! 
    firstName: String!
    lastName: String!
  }

  input SongInput {
    songTitle: String!
    singer: String!
    duration: Int!
    genre: String!
    playlist: ID
  }

  input PlaylistInput {
    playlistName: String!
    songs: [ID]
  }

  type Query {
    getUsers: [User]
    getUser: User
    getSong: [Song]
    getSongById (id: ID): Song
    getPlaylist: [Playlist]
  }

  type DeletePlaylistResponse {
    message: String!
    playlists: [Playlist!]!
  }

  type Mutation {
    registerUser(userInput: UserInput!): User
    login(username: String!, password: String!): AuthPayload

    createSong(songInput: SongInput!): Song
    updateSong(id: ID!, songInput: SongInput!): Song
    deleteSong(id: ID!): Song

    createPlaylist(playlistInput: PlaylistInput!): Playlist
    updatePlaylist(id: ID!, playlistInput: PlaylistInput!): Playlist
    removeSongFromPlaylist(id: ID!, playlistInput: PlaylistInput!): Playlist
    deletePlaylist(id: ID!): DeletePlaylistResponse
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

const isUsernameTaken = async (username) => {
  const existingUser = await UserModel.findOne({ username });
  return !!existingUser;
};


const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const user = await UserModel.find();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    getUser: async (_, args,context) => {
      if (!context.user) {
        throw new Error('u cant access detail ');
      }
      try {
        const user = await UserModel.findOne({ username: context.user.username });
        return user;
      } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
      }
    },
    
    getSong: async (_, args, context) => {
      if (!context.user) {
        throw new Error('Authentication required.');
      }
      try {
        const song = await SongModel.find();
        return song;
      } catch (error) {
        throw new Error(error);
      }
    },

    getSongById: async (_, { id }, context) => {
      if (!context.user) {
        throw new Error('Authentication required.');
      }
      try {
        const song = await SongModel.findOne({ _id: id });
        return song;
      } catch (error) {
        throw new Error(`Error fetching song: ${error.message}`);
      }
    },

    getPlaylist: async (_, args, context) => {
      if (!context.user) {
        throw new Error('Authentication required.');
      }
      try {
        const playlist = await PlaylistModel.find();
        return playlist;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    registerUser: async (_, { userInput }) => {
      try {
        // check the username
        const usernameTaken = await isUsernameTaken(userInput.username);
        
        if (usernameTaken) {
          throw new Error('Username is already taken');
        }
        
        const hashedPassword = await bcrypt.hash(userInput.password, 10);
        const newUser = {
          username: userInput.username,
          password: hashedPassword,
          firstName: userInput.firstName,
          lastName: userInput.lastName,
        };
    
        const createdUser = await UserModel.create(newUser);
        return createdUser;
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
    
    login: async (_, { username, password }) => {
      const user = await UserModel.findOne({ username });

      if (!user) {
        throw new Error('User not found');
      }

      // Verifikasi kata sandi
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Generate token untuk pengguna yang berhasil masuk
      const token = jwt.sign(user.toJSON(), secretKey, { expiresIn: '1h' });

      return {
        token,
        user,
      };
    },

    createSong: async (_, { songInput }, context) => {
      if (!context.user) {
        throw new Error('Authentication required.');
      }
      try {  
        const newSong = {
          songTitle: songInput.songTitle,
          singer: songInput.singer,
          duration: songInput.duration,
          genre: songInput.genre,
          playlist: null,
        };
  
        const createdSong = await SongModel.create(newSong);
        return createdSong;
      } catch (error) {
        throw new Error(`Error creating song: ${error.message}`);
      }
    },

    updateSong: async (_, { id, songInput }, context) => {
      if (!context.user) {
        throw new Error('Authentication required.');
      }
      try {
        const song = await SongModel.findById(id);
        if (!song) {
          throw new Error('Song not found');
        }

        song.songTitle = songInput.songTitle;
        song.singer = songInput.singer;
        song.duration = songInput.duration;
        song.genre = songInput.genre;

        const updatedSong = await song.save();
        return updatedSong;
      } catch (error) {
        throw new Error(`Error updating song: ${error.message}`);
      }
    },

    deleteSong: async (_, { id }, context) => {
      if (!context.user) {
        throw new Error('Authentication required.');
      }
      try {
        // find song
        const deletedSong = await SongModel.findById(id);
        if (!deletedSong) {
          throw new Error('Song not found');
        }
  
        // get playlistId
        const playlistId = deletedSong.playlist;
  
        // update playlist for remove the ref song that will be deleted
        if (playlistId) {
          const updatedPlaylist = await PlaylistModel.findByIdAndUpdate(
            playlistId,
            { $pull: { songs: id } }
          );
  
          if (!updatedPlaylist) {
            throw new Error('Playlist not found');
          }
        }
        await deletedSong.remove();  
        return {
          message: 'Song has been deleted and playlist collection updated.',
        };
      } catch (error) {
        throw new Error(`Error deleting song: ${error.message}`);
      }
    },

    createPlaylist: async (_, { playlistInput }, context) => {
      if (!context.user) {
        throw new Error('Authentication required.');
      }
      try {
        const { playlistName, songs } = playlistInput;

        // create a new playlist
        const newPlaylist = new PlaylistModel({ playlistName, songs });
        await newPlaylist.save();

        // update songs with the new playlist ID
        const updatedSongs = await SongModel.updateMany(
          { _id: { $in: songs } },
          { $set: { playlist: newPlaylist._id } }
        );

        if (updatedSongs.nModified === 0) {
          throw new Error('Songs not found');
        }

        return newPlaylist;
      } catch (error) {
        throw new Error(`Error creating playlist: ${error.message}`);
      }
    },

    updatePlaylist: async (_, { id, playlistInput }, context) => {
      if (!context.user) {
        throw new Error('Authentication required.');
      }
      try {
        const { playlistName, songs } = playlistInput;
        const playlist = await PlaylistModel.findById(id).populate({ path: 'songs' });
      if (!playlist) {
        throw new Error('Playlist not found');
      }

      // update playlist name
      playlist.playlistName = playlistName;

      // add songId without dup
      playlist.songs.addToSet(...songs);

      // save playlist
      const updatedPlaylist = await playlist.save();

      // update field song-playlist in every song on the playlist
      const updatedSongs = await SongModel.updateMany(
        { _id: { $in: songs } },
        { $set: { playlist: id } },
        { new: true }
      );

      if (updatedSongs.nModified === 0) {
        throw new Error('Songs not found');
      }

      return {
        message: 'Playlist updated',
        updatedPlaylist
      };
    } catch (error) {
      throw new Error(`Error updating playlist: ${error.message}`);
    }
    },

    removeSongFromPlaylist: async (_, { id, playlistInput }, context) => {
      if (!context.user) {
        throw new Error('Authentication required.');
      }
      try {
        const { playlistName, songs } = playlistInput;
  
        // find playlist
        const playlist = await PlaylistModel.findById(id);
        if (!playlist) {
          throw new Error('Playlist not found');
        }
        playlist.playlistName = playlistName;
  
        // remove the song ID from the songs array
        playlist.songs.pull(...songs);
  
        // save changes to the playlist
        const updatedPlaylist = await playlist.save();
  
        // set null playlist properties on each song removed from the playlist
        const updatedSongs = await SongModel.updateMany(
          { _id: { $in: songs } },
          { $set: { playlist: null} }
        );
  
        if (updatedSongs.nModified === 0) {
          throw new Error('Songs not found');
        }
  
        return {
          message: 'Playlist updated',
          updatedPlaylist
        };
      } catch (error) {
        throw new Error(`Error updating playlist: ${error.message}`);
      }
    },

    deletePlaylist: async (_, { id }, context) => {
      if (!context.user) {
        throw new Error('Authentication required.');
      }
      try {
        const deletedPlaylist = await PlaylistModel.findById(id);
        if (!deletedPlaylist) {
          throw new Error('Playlist not found');
        }
  
        // update your song collection to remove references to the playlist want to delete
        await SongModel.updateMany(
          { playlist: id },
          { $set: { playlist: null } }
        );

        await deletedPlaylist.remove();
        const playlists = await PlaylistModel.find();
  
        return {
          message: 'Playlist and associated songs have been deleted and updated.',
          playlists,
        };
      } catch (error) {
        throw new Error(`Error deleting playlist: ${error.message}`);
      }
    },
  },
  Playlist: {
    async songs(parent, args) {
      try {
        return await songLoader.loadMany(parent.songs); //load single data
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Song: {
    async playlist(parent, args) {
      try {
        if (parent.playlist !== null) {
          return await playlistLoader.load(parent.playlist); //load single data
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
module.exports = { typeDefs, resolvers };