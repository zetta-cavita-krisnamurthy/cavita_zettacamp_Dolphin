const express = require('express');
const mongoose = require('mongoose'); 
const app = express();
const port = 3000; 
const url = 'mongodb://localhost:27017/'; 
const database = 'song-management'; 
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { applyMiddleware } = require('graphql-middleware');
const { verifyToken } = require('./authMiddleware'); 

const { typeDefs, resolvers } = require('./graphql');

const executableSchema = makeExecutableSchema({typeDefs, resolvers});
const protectedSchema = applyMiddleware(executableSchema);

const server = new ApolloServer({
  schema: protectedSchema,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    let user = null;

    if (token) {
      try {
        user = verifyToken(token);

        // console.log(user)
      } catch (error) {
        // token verification failed, user remains null
      }
    }

    return {
      user, // attach the user information from the token to the context
    };
  },
});

// app.use(express.json());
server.applyMiddleware({app});
app.listen(port, () => {
  console.log(`GraphQl server running at http://localhost:${port}/graphql`)
})


// Connect to MongoDB
mongoose.connect(`${url}${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async() => {
    // await UserModel.create(user);
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// mongoose.set('debug',true);
