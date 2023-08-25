function hasUniqueCharacters(characters) {
    const trackChar = {};
  
    // Iterate through each character in the string
    for (let char of characters) {
      if (trackChar[char]) {
        return false; // return false if character is not unique
      }
      trackChar[char] = true; // add character to tracking object
    }
    // If the loop completes without returning false, all characters are unique
    return true;
  }
  

function hasUniqDua(characters) {
    for (let i = 0; i < characters.length; i++) {
        for (let j = i + 1; j < characters.length; j++) {
            if (characters[i] === characters[j]) {
                return false;
            }
        }
    }
    return true;
}

  // Examples
  console.log(hasUniqueCharacters("abcdefg")); // Output: true
  console.log(hasUniqueCharacters("hello"));   // Output: false

  console.log(hasUniqDua("abcdefg")); // Output: true
  console.log(hasUniqDua("hello"));   // Output: false
  