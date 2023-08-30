
function BookPurchasing(bookName, price, stock, bookAmount, discount, tax, creditDuration) {

    const amountOfDiscount = (price * discount) / 100;
    const priceAfterDiscount = price - amountOfDiscount;
    const amountOfTax = (priceAfterDiscount * tax) / 100;
    let priceAfterTax = priceAfterDiscount + amountOfTax;
    let totalPrice;
    let arrTotalPrice=[];
    let noted;
    const currentDate = new Date();  // date currently
    const invoicePayment = [];  // Array of objects that have values due date of payment and amount of payment for each month
    let isSame;

    for (let i = 0; i <= bookAmount; i++) {
        
        if ((stock >= bookAmount)){
            if (bookAmount >= stock) {
                noted = 'sorry amount of book is already out of stock u cannot purchase again';
                totalPrice = bookAmount * priceAfterTax;
                break;
            } else {
                noted = 'amount of book is still available and u can purchase again';
                totalPrice = bookAmount * priceAfterTax;
            } 
        } 
           else {
            // console.log(bookAmount)
            noted = 'sorry u can only purchased '+stock+' books. Amount of book is already out of stock u cannot purchase again';
            totalPrice = stock * priceAfterTax;
            break;
        }
        
    }

    arrTotalPrice.push(totalPrice);
    const invoiceEachMonth = arrTotalPrice.map((price, index) => index === arrTotalPrice.length-1 ? price/creditDuration : price); 
    
    // Loop untuk menghitung tanggal jatuh tempo untuk setiap bulan
    for (let i = 1; i <= creditDuration; i++) {
        const dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 
                        currentDate.getDate());

        // Then display the data as an array of objects
        invoicePayment.push({dueDate: dueDate.toDateString(), invoiceEachMonth: invoiceEachMonth[invoiceEachMonth.length-1]});
    }
        // check if all value of properties invoiceEachMonth is same or not use object.is()
        for (let i = 0; i < invoicePayment.length; i++) {
            for (let j = i + 1; j < invoicePayment.length; j++) {
                if (Object.is(invoicePayment[i].invoiceEachMonth, invoicePayment[j].invoiceEachMonth)) {
                    isSame = true;

                } else {
                    isSame = false;
                }
            }
        }

    
        // slice method
        // const dates = invoicePayment.slice(1);

        // reverse method
        // const dateReverse = invoicePayment.reverse();

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
        noted,
        invoicePayment,
        isSame
        // dates,
        // dateReverse
    };
}

// console.log(BookPurchasing(purchasing[0].bookName, purchasing[0].price, null, purchasing[0].bookAmount, purchasing[0].discount, purchasing[0].tax));
console.log(BookPurchasing('Gerbang Dialog Danur', 30000, 8, 2, 5,5,3));

