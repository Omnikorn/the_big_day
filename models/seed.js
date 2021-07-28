const mongoose = require('mongoose')
const db = require('./guests')

mongoose.connect("mongodb+srv://team3:trilogy21@cluster0.ir5sl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })

const GuestSeed = [{
    name: 'andrea',
    surname: 'dibi'

}, {
    name: 'harith'
},
{
    name: 'paolo'
}]

db.Guests.deleteMany({})
    .then(() => db.Guests.collection.insertMany(GuestSeed))
    .then((data) => {
        console.log(data.length + '  records inserted');
        process.exit(0)
    })

    .catch((err) => { console.error(err) })