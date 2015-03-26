/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var book = require('./book.model');

exports.register = function(socket) {
  book.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  book.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('book:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('book:remove', doc);
}
