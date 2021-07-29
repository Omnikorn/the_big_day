const db = require('../../config/db');
const { User, wedding } = require('../models');

const userData = require('./userData.json');
const weddingData = require('./weddingData.json');

db.once('open', async () => {
    await wedding.deleteMany({});

    const couples = await wedding.inerstMany(weddingData);
    console.log('couples seeded!')
    process.exit(0);
})

db.once('open', async () => {
    await User.deleteMany({});

    const users = await User.insertMany(userData);
    console.log('users seeded!')
    process.exit(0);
})
