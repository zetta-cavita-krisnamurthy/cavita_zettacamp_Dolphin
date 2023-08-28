
function containDuplicate(nums) {
    // for (let i = 0; i < characters.length; i++) {
    //     for (let j = i + 1; j < characters.length; j++) {
    //       if (characters[i] === characters[j]) {
    //         return true;
    //       }
    //     //   console.log(characters[i], characters[j])
    //     }
    //   }
    //   return false;

    let count = {};
    nums.forEach(item => { // start looping elements
        if (count[item]) { // check if the items exists in the object as a property
            count[item]++
        } else {
            count[item] = 1;
        }
    });
    // console.log(count)
    for (let prop in count) {
        if (count[prop] >= 2) {
            return true;
        }
    }
    return false;
  }

//   Example
// console.log(containDuplicate([1, 2, 3, 1])); // Output: true
// console.log(containDuplicate([1, 2, 3, 4])); // Output: false
console.log(containDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2, 5])); // Output: true