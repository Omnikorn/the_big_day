const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const path = require('path');
const mongoose = require ('mongoose')
const {ApolloServer} = require ("apollo-server-express")
const {typeDefs, resolvers} = require ("./server/models");
const { authMiddleware } = require('./server/utils/auth');

const server = new ApolloServer ({
    typeDefs,
    resolvers,
    context: authMiddleware
})


// routes
// const routes = require('./');






const app = express();

// Connect Database
connectDB();

// wrap app with apollo server
server.applyMiddleware({app})


// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));


app.use(express.static(path.join(__dirname, 'client/build')))

// use Routes
// app.use('/api/books', books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));