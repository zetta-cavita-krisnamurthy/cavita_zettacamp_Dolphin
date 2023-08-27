
let book1 = "Gerbang Dialog Danur";
book1 = "Senjakala";
console.log(book1);

const book2 = "Senjakala";
// book2 = "William Shakespeare";
console.log(book2);

// Concatenation
const favBooks = book1 + " and " + book2;
console.log(favBooks);

// number data type
let yearBook1 = 1954;
let yearBook2 = -1937;
const totalYear = yearBook1 + yearBook2;
console.log(totalYear);

// boolean data type
let isBook1Published = true;
let isBook2Published = false;
const isAllPublished = isBook1Published && isBook2Published;
console.log(isAllPublished);

// null data type
let book3 = null;
console.log(book3);

// undefined data type
let book4 = 5;
console.log(book4);

// object data type
let book5 = {
    title: "Gerbang Dialog Danur",
    year: 1954,
    isPublished: true
};
console.log(book5);
console.log(book5.title);

// array data type
let books = ["Gerbang Dialog Danur", "Senjakala", "William Shakespeare"];
console.log(books);
console.log(books[3]);

// array of object variable
let books2 = [
    {
        title: "Gerbang Dialog Danur",
        year: 2000,
        isPublished: true
    },
    {
        title: "Senjakala",
        year: 1944,
        isPublished: true
    },
    {
        title: "William Shakespeare",
        year: 1954,
        isPublished: true
    }
];
console.log(books2);
console.log(books2[2].year);
