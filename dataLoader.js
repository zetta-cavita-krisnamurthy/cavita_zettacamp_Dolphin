const BookModel = require('./models/book.model');
const AuthorModel = require('./models/author.model');
const DataLoader = require('dataloader');
// utility library in the JavaScript ecosystem, oft used in GraphQL servers, 
// that helps to efficiently load and cache data from a data source, 
// a db, API, or any asynchronous data fetching operation.

const bookLoader = new DataLoader(async (bookIds) => {
    // load books based on provided bookIds
    const books = await BookModel.find({ _id: { $in: bookIds } });
    const bookMap = {};
    books.forEach((book) => {
      bookMap[book._id] = book;
    });
    return bookIds.map((bookId) => bookMap[bookId]);
  });

  const authorLoader = new DataLoader(async (authorIds) => {
    // load authors based on provided authorIds
    const authors = await AuthorModel.find({ _id: { $in: authorIds } });
    const authorMap = {};
    authors.forEach((author) => {
      authorMap[author._id] = author;
    });
    return authorIds.map((authorId) => authorMap[authorId]);
  });

  module.exports = { authorLoader, bookLoader };