const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Guest = new Schema
({name : 
    {
        type : String
    }})

const Guests = mongoose.model('Guests', Guest)

module.exports = { Guests };


// TODO why do we have 2 model directories ? 