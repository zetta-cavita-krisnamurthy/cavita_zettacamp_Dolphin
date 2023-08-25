

function BookPurchasing(bookName, price, stock, bookAmount, discount, tax) {

    const amountOfDiscount = (price * discount) / 100;
    const priceAfterDiscount = price - amountOfDiscount;
    const amountOfTax = (priceAfterDiscount * tax) / 100;
    let priceAfterTax = priceAfterDiscount + amountOfTax;
    let totalPrice;

    let noted;
    for (let i = 0; i <= bookAmount; i++) {
        
        if ((stock >= bookAmount)){
            if (bookAmount >= stock) {
                noted = 'sorry amount of book is already out of stock you cannot purchase again';
                totalPrice = bookAmount * priceAfterTax;
                break;
            } else {
                noted = 'amount of book is still available and you can purchase again';
                totalPrice = priceAfterTax * bookAmount;
            } 
        } 
           else {
            // console.log(bookAmount)
            noted = 'sorry u can only purchased '+stock+' books. Amount of book is already out of stock you cannot purchase again';
            totalPrice = stock * priceAfterTax;
            break;
        }

    }

    return {
        bookName,
        bookAmount,
        stock,
        price,
        discount,
        tax,
        amountOfDiscount,
        priceAfterDiscount,
        amountOfTax,
        priceAfterTax,
        totalPrice,
        noted
    };
}

// console.log(BookPurchasing(purchasing[0].bookName, purchasing[0].price, null, purchasing[0].bookAmount, purchasing[0].discount, purchasing[0].tax));
console.log(BookPurchasing('Gerbang Dialog Danur', 30000, 6, 5, 5,5));



