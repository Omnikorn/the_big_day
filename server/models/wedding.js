const { Schema, model } = require("mongoose");


// TODO should this be called weddingSchem ? 
// TODO need to create a guest schem and import it into wedding and import weddings into user 

const weddingSchema = new Schema({
  bride_first_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  bride_last_name: {
    type: String,
    required: true,
    unique: true,
  },
  groom_first_name: {
    type: String,
    required: true,
    unique: true,
  },
  groom_last_name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: DataTypes.Date,
    allowNull: false,
  },
  venue: {
    type: String,
    required: true,
    unique: true,
  },
  menu_choice: [
    {
      type: String,
    },
  ],
  description: {
      type: String,
      required: true,
  },
});

const wedding = model('wedding', weddingSchema);
module.exports = wedding;