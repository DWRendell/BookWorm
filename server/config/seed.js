/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Book = require('../api/book/book.model');
var Thing = require('../api/thing/thing.model');


Book.find({}).remove(function() {
  Book.create({
    title   : 'Harry Potter and the Prisoner of Azkaban',
    author  : 'J.K. Rowling',
    isbn    : '0747542155'
  }, {
    title   : 'Flowers for Algernon',
    author  : 'Daniel Keyes',
    isbn    : '0151315108'
  }, {
    title   : 'To Kill a Mockingbird',
    author  : 'Harper Lee',
    isbn    : '9788466626767'
  }, {
    title   : 'Northern Lights',
    author  : 'Philip Pullman',
    isbn    : '0590541781'
  }, {
    title   : 'Lirael',
    author  : 'Garth Nix',
    isbn    : '9780606246057'
  });
});

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});
