const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String },
  img: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('image', schema);