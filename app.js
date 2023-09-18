const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const secretKey = 'IniSecr3tk3Y'; 

app.use(express.json());

const songs = [
  {
      title: 'Cruel Summer',
      artist: 'Taylor Swift',
      genre: 'Pop Rock',
      duration: 178
  },
  {
      title: 'Lowkey',
      artist: 'Niki',
      genre: 'Indie',
      duration: 171
  },
  {
      title: 'August',
      artist: 'Taylor Swift',
      genre: 'Pop',
      duration: 2610
  },
  {
      title: 'Ocean & Engines',
      artist: 'Niki',
      genre: 'Afrobeats',
      duration: 3360
  },
  {
      title: 'Lover',
      artist: 'Taylor Swift',
      genre: 'Dance',
      duration: 221
  },
  {
      title: 'Bejeweled',
      artist: 'Udin',
      genre: 'Afrobeats',
      duration: 320
  },
      {
      title: 'Aku Bukan Superman',
      artist: 'Udin',
      genre: 'Afrobeats',
      duration: 320
  },
  {
      title: 'Heather',
      artist: 'Conan Gray',
      genre: 'Dream Pop',
      duration: 252
  }
]

// middleware
function authenticateToken(req, res, next) {
  let token = req.headers['authorization'];
  // console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }
  
  const bearer = token.split(' ');
  const bearerToken = bearer[1];
  token = bearerToken;
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      // console.log(err);
      // return res.status(403).json({ error: 'Token Invalid' });
      return res.status(403).json({ error: err.message });
    }

    req.user = user;
    next();
  });
}

app.post('/auth', (req, res) => {
  const { username, password } = req.body;

  // If credentials are valid, generate a JWT token
  if (username === 'cavitasanti' && password === 'password') {
    const token = jwt.sign({ username, password }, secretKey, { expiresIn: '1h' });
    res.json({ 
      message:"You are in!",
      token,
     });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

  
app.get('/api/groupByArtist', authenticateToken, (req, res) => {
    const groupedSongsByArtist = {};
    songs.forEach(song => {
        if (groupedSongsByArtist[song.artist]) {
            groupedSongsByArtist[song.artist].push(song);
        } else {
            groupedSongsByArtist[song.artist] = [song];
        }
    });
    res.send(groupedSongsByArtist);
  });
  
  app.get('/api/groupByGenre', authenticateToken, (req, res) => {
    const groupedSongsByGenre = {};
    songs.forEach(song => {
        if (groupedSongsByGenre[song.genre]) {
            groupedSongsByGenre[song.genre].push(song);
        } else {
            groupedSongsByGenre[song.genre] = [song];
        }
    });
    res.send(groupedSongsByGenre);
  });
  
  app.get('/api/groupLessThanOneHour', authenticateToken, (req, res) => {
    const maxDuration = 3600; // 1 hour in seconds
    const groupedBySumDuration = [];
    let totalDuration = 0;
  
      while (totalDuration < maxDuration && songs.length > 0) {
        const randomSongIndex = Math.floor(Math.random() * songs.length);
        const randomSong = songs[randomSongIndex];
  
        if (totalDuration + randomSong.duration <= maxDuration) {
          groupedBySumDuration.push(randomSong);
          totalDuration += randomSong.duration;
        }
        // songs.splice(randomSongIndex, 1);
      }
    res.send(groupedBySumDuration);

  });

  
  const port = 3000; 
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
