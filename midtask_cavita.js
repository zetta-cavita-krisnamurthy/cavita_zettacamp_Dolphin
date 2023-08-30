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

// function to group song based on artists
function groupByArtist(songs) {
    const groupedSongsByArtist = {};
    songs.forEach(song => {
        if (groupedSongsByArtist[song.artist]) {
            groupedSongsByArtist[song.artist].push(song);
        } else {
            groupedSongsByArtist[song.artist] = [song];
        }
    });
    return groupedSongsByArtist;

}

// function to group song based on genre
function groupByGenre(songs) {
    const groupedSongsByGenre = {};
    songs.forEach(song => {
        if (groupedSongsByGenre[song.genre]) {
            groupedSongsByGenre[song.genre].push(song);
        } else {
            groupedSongsByGenre[song.genre] = [song];
        }
    });
    return groupedSongsByGenre;
}

// function to group song to play song less than 1 hour with random artists & genres
function groupLessThanOneHour(songs) {
    const maxDuration = 3600; // 1 hour in seconds
    const groupedBySumDuration = [];
    let totalDuration = 0;
  
      while (totalDuration < maxDuration && songs.length > 0) {
        const randomSongIndex = Math.floor(Math.random() * songs.length);
        const randomSong = songs[randomSongIndex];
  
        if (totalDuration + randomSong.duration <= maxDuration) {
          groupedBySumDuration.push(randomSong);
          totalDuration += randomSong.duration;
        //   console.log(Math.random());
        console.log(songs.length);
        // console.log(randomSongIndex);
        }
  
        // Remove the selected song from the list
        songs.splice(randomSongIndex, 1);
      }
    return groupedBySumDuration;
    
    }

// console.log('Here are group song base on artist:'); 
// console.log(groupByArtist(songs));

// console.log('Here are group song base on genre:');
// console.log(groupByGenre(songs));

console.log('Here is playlist in a hour:');
console.log(groupLessThanOneHour(songs));