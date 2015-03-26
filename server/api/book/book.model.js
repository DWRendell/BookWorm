'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: false},
  isbn: {type: String, required: false}
});

module.exports = mongoose.model('Book', BookSchema);
