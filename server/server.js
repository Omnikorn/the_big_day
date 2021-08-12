const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require ("cors")
require("dotenv").config()

    
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware,
});

server.applyMiddleware({ app })
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
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
         process.env.MONGODB_CONNECTION_STRING,
             {
               useNewUrlParser: true,
               useUnifiedTopology: true,
             }
     )
     .then(() => console.log("MongoDB has been connected"))
     .catch((err) => console.log(err));