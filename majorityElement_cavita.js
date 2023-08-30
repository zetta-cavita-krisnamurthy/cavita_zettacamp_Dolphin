
function majorityElement(nums) {

  let count = {};
    nums.forEach(item => { // start looping elements
        if (count[item]) { // check if the items exists in the object as a property
            count[item]++
        } else {
            count[item] = 1;
        }
    });
    // console.log(count)

    // find the max value in the object and return the property by index
    let max = nums[0]; 
    // let maxProp = count[nums[0]]; // frequency of the first element
    for (let prop in count) { // loop through the object
        if (count[prop] > max) { // check if the value of the property is greater than the max
            max = prop; // if it is, then assign the value of the prop to the max
            // maxProp = count[prop]; // set the maxProp to the value of the property
        }
    }
    
    return max;

}

// console.log(majorityElement([2,3,3,2])); // Output: 2 
// console.log(majorityElement([5, 1, 3, 3, 1, 5])); // Output: 5

console.log(majorityElement([3, 2, 3,4])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2 