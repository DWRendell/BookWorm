'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  isbn: {type: String, required: true}
});

module.exports = mongoose.model('Book', BookSchema);
