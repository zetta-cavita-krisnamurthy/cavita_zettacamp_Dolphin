const { gql } = require('apollo-server-express');
const AuthorModel = require('./models/author.model');
const BookModel = require('./models/book.model');
const BookshelfModel = require('./models/bookshelf.model');
const {authorLoader, bookLoader} = require('./dataLoader');
// const { generateToken  } = require('./authMiddleware');
// const user = {
//   id: 123,
//   username: 'exampleUser',
// };

// const token = generateToken(user);
// console.log('Generated Token:', token);

const typeDefs = gql`
  type Author {
    _id: ID!
    authorName: String!
    age: Int!
  }

  type Book {
    _id: ID!
    bookName: String!
    author: Author 
    genre: String!
    price: Int!
    disc: Int!
    stock: Int!
    canSell: Boolean!
    message: String
    bookshelf: Bookshelf
  }

  type Bookshelf {
    _id: ID!
    bookshelfName: String!
    books: [Book!]!
  }

  
  input BookInput {
    bookName: String!
    authorId: ID!
    genre: String!
    price: Int!
    disc: Int!
    stock: Int!
    bookshelfId: ID
  }

  type Query {
    getAuthors: [Author] 
    getBooks: [Book]
    getBookById (id: ID): Book
    getBookshelves: [Bookshelf]
  }


  type Mutation {
    createBook(bookInput: BookInput!): Book
    createBooks(booksInput: [BookInput!]!): [Book]!
    updateBook(id: ID!, bookInput: BookInput!): Book
    deleteBook(id: ID!): Book
    generateToken: AuthToken!
  }

  type AuthToken {
    token: String!
  }
`;
// use loadmany dataloader in resolvers to get books and bookshelf
const resolvers = {
  // using to retrieve data
  Query: {
    getAuthors: async () => {
      try {
        const authors = await AuthorModel.find();
        return authors;
      } catch (error) {
        throw new Error(error);
      }
    },

    getBooks: async () => {
      try {
        const books = await BookModel.find();
        // use DataLoader to efficiently load authors for all books
        const authors = await authorLoader.loadMany(books.map((book) => book.author));
        
        // combine the loaded authors with the books
        // creates a new array, booksWithAuthors, 
        // where each element is an object representing a book with its author
        const booksWithAuthors = books.map((book, index) => ({
          ...book.toObject(),           // convert toobj
          author: authors[index],
        }));
        
        return booksWithAuthors;
      } catch (error) {
        throw new Error(error);
      }
    },

    getBookById: async (parent, { id }) => {
      try {
        const book = await BookModel.findOne({ _id: id }).populate('author');
        // return a book that match with the id
        return book;
      } catch (error) {
        throw new Error(`Error fetching book: ${error.message}`);
      }
    },

    getBookshelves: async () => {
      // if (!user) {
      //   throw new Error('Authentication required.');
      // }
      try {
        const bookshelves = await BookshelfModel.find();

        for (const bookshelf of bookshelves) {
          const books = await bookLoader.loadMany(bookshelf.books);
          bookshelf.books = books;
          console.log(books)
        }

        return bookshelves;
      } catch (error) {
        throw new Error(error);
      }
    },
  },


  Mutation: {
    createBook: async (parent, { bookInput }) => {
      try {
        const author = await AuthorModel.findById(bookInput.authorId);
        if (!author) {
          throw new Error('Author not found');
        }
  
        const newBook = {
          bookName: bookInput.bookName,
          author: author._id,
          genre: bookInput.genre,
          price: bookInput.price,
          disc: bookInput.disc,
          stock: bookInput.stock,
        };
  
        const createdBook = await BookModel.create(newBook);
        // returns a newly created Book object
        return createdBook;
      } catch (error) {
        throw new Error(`Error creating book: ${error.message}`);
      }
    },

    createBooks: async (parent, { booksInput }) => {
      try {
        const authorMap = {}; // store authors by ID for efficient lookup
        const booksToCreate = [];
  
        for (const bookInput of booksInput) {
          const authorId = bookInput.authorId;
  
          // find the author in the map, query and cache it
          if (!authorMap[authorId]) {
            const author = await AuthorModel.findById(authorId);
            if (!author) {
              throw new Error(`Author with ID ${authorId} not found`);
            }
            authorMap[authorId] = author;
          }
  
          const newBook = {
            bookName: bookInput.bookName,
            author: authorMap[authorId]._id,
            genre: bookInput.genre,
            price: bookInput.price,
            disc: bookInput.disc,
            stock: bookInput.stock,
          };
          // push to array
          booksToCreate.push(newBook);
        }
  
        const createdBooks = await BookModel.create(booksToCreate);
        // returns a newly created Books
        return createdBooks;
      } catch (error) {
        throw new Error(`Error creating books: ${error.message}`);
      }
    },

    updateBook: async (parent, { id, bookInput }) => {
      try {
        // update an existing book in the database
        const book = await BookModel.findById(id);
        if (!book) {
          throw new Error('Book not found');
        }

        const author = await AuthorModel.findById(bookInput.authorId);
        if (!author) {
          throw new Error('Author not found');
        }

        book.bookName = bookInput.bookName;
        book.author = author;
        book.genre = bookInput.genre;
        book.price = bookInput.price;
        book.disc = bookInput.disc;
        book.stock = bookInput.stock;

        const updatedBook = await book.save();
        // will update the details of the book
        return updatedBook;
      } catch (error) {
        throw new Error(`Error updating book: ${error.message}`);
      }
    },

    deleteBook: async (parent, { id }) => {
      try {
        // delete a book from the database
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
          throw new Error('Book not found');
        }
        return {
          _id : id,
          message: "Book deleted successfully",
        };

      } catch (error) {
        throw new Error(`Error deleting book: ${error.message}`);
      }
    },
  },
  Book: {
    canSell: (book) => {
      return book.stock > 0;
    },
    
  },
};


module.exports = { typeDefs, resolvers };