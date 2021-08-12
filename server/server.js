const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require("cors")
const mongoose = require("mongoose")
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const bodyParser = require("body-parser");
 
require("dotenv").config()

    mongoose
     .connect(
         process.env.MONGODB_CONNECTION_STRING,
             {
               useNewUrlParser: true,
               useUnifiedTopology: true,
             }
     )
     .then(() => console.log("MongoDB has been connected"))
     .catch((err) => console.log(err));



const PORT = process.env.PORT || 5000
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware,
});


server.applyMiddleware({ app })
// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

mongoose
  .connect(
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));