const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require ("cors")

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');


const PORT = process.env.PORT || 3500;
const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });
app.use(cors())
let server = async () => {
  apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: authMiddleware,
  });
  await apolloServer.start();


apolloServer.applyMiddleware({ app });}
server()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Serve up static assets
// app.use('/images', express.static(path.join(__dirname, '../client/images')));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}`);
  });
});
