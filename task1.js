let bookOne = "Gerbang Dialog Danur";
bookOne = "Senjakala";
const bookTwo = "Senjakala";

// Comparison
bookSame = bookOne == bookTwo;
console.log("are the books same ? " + bookSame);

// not equal
bookSame = bookOne != bookTwo;
console.log(bookSame);

console.log('1' === 1); // strict equality

// task 2.1
priceBookOne = 285000;
priceBookTwo = 912000;
const highestPrice = (priceBookOne >= priceBookTwo) * priceBookOne + 
                     (priceBookOne < priceBookTwo) * priceBookTwo;
console.log("highest price is " + highestPrice);

remainder = priceBookOne % 90;
console.log("remainder of " + priceBookOne + " divided by 90 is " + remainder);

// task 2.2
const averagePrice = (priceBookOne + priceBookTwo) / 2;
console.log("average price is " + averagePrice);

// task 2.3
const priceStatus = (averagePrice > 500000) ? "Expensive" : "Cheap";
console.log("price status is " + priceStatus);

// assign new key into object
let book = {
    title: "Gerbang Dialog Danur",
    year: 1954,
    isPublished: true

};
book.author = "Risa Saraswati";
console.log(book);

// push an object into existing array
let books = [
    {
        title: "Gerbang Dialog Danur",
        year: 2000,
        isPublished: true
    },
    {
        title: "Senjakala",
        year: 1944,
        isPublished: true
    }
];
books.push(book);
books[0].author = "Risa Saraswati"; // assign new key object into existing array
console.log(books);

// assignment operator
let first = 5;
let second = 3;
console.log(first += second); // additionassignment
console.log(first -= second); // subtractionassignment
console.log(first *= second); // multiplicationassignment
console.log(first /= second); // divisionassignment
console.log(first %= second); // remainderassignment

// post and pre operator
let numOne = 5;
let resultOne = numOne++;
console.log(resultOne); // O: 5
console.log(numOne);    // O: 6

let num = 5;
let result = ++num;
console.log(result); // O: 6
console.log(num);    // O: 6

// Exponentiation Assignment (**=)
console.log(3 ** 3);

// Bitwise 
const numbA = 5; // 101
const numbB = 3; // 011
console.log(numbA & numbB); // 001 AND
console.log(numbA | numbB); // 111 OR
console.log(numbA ^ numbB); // 11 XOR
console.log(~numbA);    // 10 NOT

// Logical AND Assignment (&&=)
// let aCoba = 1;
// let bCoba = 0;

// aCoba &&= 2;
// console.log(aCoba);

// bCoba &&= 2;
// console.log(bCoba);

