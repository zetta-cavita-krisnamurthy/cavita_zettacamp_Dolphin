
const express = require('express') //import modul
const app = express()
const port = 2032

app.use(express.json());


// Middleware function for basic authentication
const basicAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; 
  
    if (!authHeader) {
      // No Authorization header provided
      res.status(401).send('Authentication failed - No Authorization header');
      return;
    }
    // auth = "Basic <encoded username:password>"
    // get userpass via split
    const [authType, authValue] = authHeader.split(' ');
  
    if (authType !== 'Basic') {
      // Invalid Authorization type
      res.status(401).send('Authentication failed - Invalid Authorization type');
      return;
    }

    //decode userpass "username:password"
    const credentials = Buffer.from(authValue, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    // console.log(username,password)

    // Define a list of authorized users and their passwords
    const userAuth = 'cavita';
    const passAuth = '123';

    // authentication
    if (userAuth !== username || passAuth !== password) {           //strict inequality
      // Invalid credentials
      res.status(401).send('Authentication failed - Invalid credentials');
      return;
    }
  
    // Authentication successful, proceed to the next 
    next();
  };
  

async function BookPurchasing(bookName, price, stock, bookAmount, discount, tax, creditDuration) {

    const amountOfDiscount = (price * discount) / 100;
    const priceAfterDiscount = price - amountOfDiscount;
    const amountOfTax = (priceAfterDiscount * tax) / 100;
    let priceAfterTax = priceAfterDiscount + amountOfTax;
    let totalPrice;
    let arrTotalPrice=[];
    let stockAvailable;
    let noted;

    for (let i = 0; i <= bookAmount; i++) {      
        if ((stock >= bookAmount)){
            if (bookAmount >= stock) {
                noted = 'sorry amount of book is already out of stock u cannot purchase again';
                totalPrice = bookAmount * priceAfterTax;
                stockAvailable = 0;
                break;
            } else {
                noted = 'amount of book is still available and u can purchase again';
                totalPrice = bookAmount * priceAfterTax;
                stockAvailable = stock - bookAmount;
            } 
        } 
           else {
            // console.log(bookAmount)
            noted = 'sorry u can only purchased '+stock+' books. Amount of book is already out of stock u cannot purchase again';
            totalPrice = stock * priceAfterTax;
            stockAvailable = 0;
            break;
        }
        
    }

    arrTotalPrice.push(totalPrice);
    const invoiceEachMonth = arrTotalPrice.map((price, index) => index === arrTotalPrice.length-1 ? price/creditDuration : price); 
    // console.log(invoiceEachMonth);
    

    return {
        bookName,
        bookAmount,
        stockAvailable,
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

async function CalculatingTerm(totalPrice, creditDuration, additionalPrice) {
  let arrTotalPrice=[];
  const currentDate = new Date();  // date currently
  const invoicePayment = [];  // Array of objects that have values due date of payment and amount of payment for each month

  arrTotalPrice.push(totalPrice);
  const invoiceEachMonth = arrTotalPrice.map((price, index) => index === arrTotalPrice.length-1 ? price/creditDuration : price); 
  // console.log(invoiceEachMonth);
  
  // Loop for calculate due date 
  for (let i = 1; i <= creditDuration; i++) {
      const dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 
                      currentDate.getDate());
      // add additional price if i == creditduration
      if (additionalPrice >= 0 && i == creditDuration){
        invoicePayment.push({dueDate: dueDate.toDateString(), invoiceEachMonth: (invoiceEachMonth[invoiceEachMonth.length-1]+additionalPrice)});
      } else {
        invoicePayment.push({dueDate: dueDate.toDateString(), invoiceEachMonth: invoiceEachMonth[invoiceEachMonth.length-1]});
      }
      // console.log(invoiceEachMonth.length);
  }

  return {
      invoicePayment
  };
}

app.get('/book-purchase', basicAuthMiddleware, async (req, res) => {
  const parameterName = ['bookName', 'price', 'stock', 'bookAmount', 'discount', 'tax', 'creditDuration'];

  // Check if any of the keys in req.body are not in the parameterName array
  const missingParameters = parameterName.filter(param => !Object.keys(req.body).includes(param));
  if (missingParameters.length > 0) {
    res.status(400).send(`Bad Request - Missing parameters: ${missingParameters.join(', ')}`);
    return;
  }

  // Check if any parameter has a value of 0 or is null
  const invalidParameters = parameterName.filter(param => req.body[param] === 0 || req.body[param] === null);
  if (invalidParameters.length > 0) {
    res.status(400).send(`Bad Request - Invalid parameters: ${invalidParameters.join(', ')}`);
    return;
  }

  const { bookName, price, stock, bookAmount, discount, tax, creditDuration, additionalPrice } = req.body;

  // error handling
  let purchase;
  try {
      purchase = await BookPurchasing(
      bookName,
      price,
      stock,
      bookAmount,
      discount,
      tax,
      creditDuration,
      additionalPrice
    );
    // res.send(purchase);
    const { totalPrice } = purchase;
    const calculate = await CalculatingTerm(totalPrice, creditDuration, additionalPrice);
    res.send({ purchase, calculate });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

