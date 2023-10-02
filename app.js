const express = require('express');
const mongoose = require('mongoose'); 
const app = express();
const port = 3000; 
const url = 'mongodb://localhost:27017/'; 
const database = 'test_database'; 
const { ApolloServer, ApolloError } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { applyMiddleware } = require('graphql-middleware');
const { verifyToken } = require('./authMiddleware'); // Import the authentication middleware

const { typeDefs, resolvers } = require('./graphql');

const executableSchema = makeExecutableSchema({typeDefs, resolvers});
const protectedSchema = applyMiddleware(executableSchema);

const { generateToken  } = require('./authMiddleware');
const { Token } = require('graphql');
const user = {
  id: 123,
  username: 'exampleUser',
};

const token = generateToken(user);
console.log('Generated Token:', token);
const server = new ApolloServer({
  schema : protectedSchema,
  // context: (req) => ({
  //   req: req.req
  // }),
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    let user = null;

    console.log('token', token);
    if (!token) {
      throw new ApolloError('gak') 
    }else{
      try {
        user = verifyToken(token);
      } catch (error) {
        // Token verification failed, user remains null
        console.log('gaga');
        throw new ApolloError('errornibro') 
      }
    }

    return {
      user, // Attach the user information from the token to the context
    };
  },
});

// app.use(express.json());
server.applyMiddleware({app});
app.listen(port, () => {
  console.log(`GraphQl server running at http://localhost:${port}/graphql`)
})


// const book = {
//   bookName: 'Suara Dilan',
//   author: '6507eb1c101bc104b0b4623d',
//   genre: 'Romance',
//   price: 80000,
//   disc: 10,
//   stock: 15
// };

// const author = {
//   authorName: 'Pidi Baiq',
//   age: 40,
// }

// const bookshelf = {
//   bookshelfName: 'Comedy with Romance',
//   books: ["650ba5cad34d252e98812dd8","650ba5ffae1e2f081cd99c15"],
// }

// Connect to MongoDB
mongoose.connect(`${url}${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async() => {
    console.log('Connected to MongoDB');
    // await bookModel.create(book);
    // await authorModel.create(author);
    // await bookshelfModel.create(bookshelf);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

mongoose.set('debug',true);
