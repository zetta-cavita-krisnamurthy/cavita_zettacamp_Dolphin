
function BookPurchasing(bookName, price, bookAmount, discount, tax) {
    // discount = (discount == 0 || discount == undefined || discount == null || discount == '') ? purchasing[0].discount : discount;
    discount = !discount ? purchasing[0].discount : discount;
    
    // use parseInt()
    if (typeof price == 'string') {
        price = parseInt(price);
    }

    const amountOfDiscount = (price * discount) / 100;
    const priceAfterDiscount = price - amountOfDiscount;
    const amountOfTax = (priceAfterDiscount * tax) / 100;
    let priceAfterTax = priceAfterDiscount + amountOfTax;
    priceAfterTax = (bookAmount > 1) ? priceAfterTax * bookAmount : priceAfterTax;
    let message = 'You have purchased ' + bookAmount + " x " + bookName + 
                  ' with price Rp' + price + ' with discount ' + discount + 
                  '% and tax ' + tax + '%.';

    return {
        bookName,
        bookAmount,
        price,
        discount,
        tax,
        amountOfDiscount,
        priceAfterDiscount,
        amountOfTax,
        // message + ' Price after discount is Rp' + priceAfterDiscount + '.',
        message : message + ' Price after tax is Rp' + priceAfterTax + '.'
    };
}

// array of object variable purchasing
let purchasing = [
    {
        bookName: "Gerbang Dialog Danur",
        price: "30000",
        bookAmount: 2,
        discount: 10,
        tax: 5
    },
    {
        bookName: "Senjakala",
        price: 40000,
        bookAmount: 1,
        discount: 10,
        tax: 5
    },
    {
        bookName: "William Shakespeare",
        price: 50000,
        bookAmount: 1,
        discount: 10,
        tax: 5
    }
];


// looping for purchasing
// for (let i = 0; i < purchasing.length; i++) {
//     console.log(BookPurchasing(purchasing[i].bookName, purchasing[i].price, purchasing[i].bookAmount, purchasing[i].discount, purchasing[i].tax));
// }

console.log(BookPurchasing(purchasing[0].bookName, purchasing[0].price, purchasing[0].bookAmount, purchasing[0].discount, purchasing[0].tax));
console.log(BookPurchasing('Gerbang Dialog Danur', 30000, 2, "",5));

// arrow function
const triAngle = (base, height) => {
    const area = (base * height) / 2;
    return area;
}
console.log(triAngle(10, 5));
