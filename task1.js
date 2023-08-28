
function BookPurchasing(bookName, price, stock, bookAmount, discount, tax, creditDuration) {

    const amountOfDiscount = (price * discount) / 100;
    const priceAfterDiscount = price - amountOfDiscount;
    const amountOfTax = (priceAfterDiscount * tax) / 100;
    let priceAfterTax = priceAfterDiscount + amountOfTax;
    let totalPrice;
    let noted;
    const currentDate = new Date();  // Tanggal saat ini
    const dueDates = [];  // Array untuk menyimpan tanggal jatuh tempo

    for (let i = 0; i <= bookAmount; i++) {
        
        if ((stock >= bookAmount)){
            if (bookAmount >= stock) {
                noted = 'sorry amount of book is already out of stock u cannot purchase again';
                totalPrice = bookAmount * priceAfterTax;
                break;
            } else {
                noted = 'amount of book is still available and u can purchase again';
                totalPrice = priceAfterTax * bookAmount;
            } 
        } 
           else {
            // console.log(bookAmount)
            noted = 'sorry u can only purchased '+stock+' books. Amount of book is already out of stock u cannot purchase again';
            totalPrice = stock * priceAfterTax;
            break;
        }

    }

    // Loop untuk menghitung tanggal jatuh tempo untuk setiap bulan
    for (let i = 1; i <= creditDuration; i++) {
        const dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 
                        currentDate.getDate());
        const monthName = dueDate.toLocaleString('default', { month: 'long' }); // Mengubah angka bulan menjadi nama bulan
        const year = dueDate.getFullYear();
        const invoiceEachMonth = totalPrice / creditDuration;
    
        dueDates.push(`Due date for ${monthName} ${year}: ${dueDate.toDateString()} 
                        Invoice each month: ${invoiceEachMonth}`);
        // return `Due date for ${monthName} ${year}: ${dueDate.toDateString()}`;
    }

        // slice method
        const dates = dueDates.slice(1);

        // reverse method
        // const dateReverse = dueDates.reverse();

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
        dueDates,
        dates,
        // dateReverse
    };
}

// console.log(BookPurchasing(purchasing[0].bookName, purchasing[0].price, null, purchasing[0].bookAmount, purchasing[0].discount, purchasing[0].tax));
console.log(BookPurchasing('Gerbang Dialog Danur', 30000, 8, 2, 5,5,3));

