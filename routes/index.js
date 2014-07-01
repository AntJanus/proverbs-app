//modules

var express   = require('express');
var app       = module.exports = express();
var config    = require('../config');
var Reader    = require('./lib/reader');
var reader    = new Reader(config.reader ? config.reader : {});
var _         = require('lodash');
var async     = require('async');
var md        = require('marked');

var getProverbs = function() {
  var slug = [''];
  var payload = {};
  payload = reader.getFile(slug);

  return payload;
};

//routes
app.get('/', function(req,res) {
  var payload = getProverbs();

  if (payload.error) {
    res.send('404', payload);
  } else {
    res.send(payload.proverbs);
  }
});

app.get('/random', function(req,res) {
  var payload = getProverbs();

  if (payload.error) {
    res.send('404', payload);
  } else {
    var proverbs = payload.proverbs;
    res.setHeader('content-type', 'application/json');
    res.send(proverbs[Math.floor(Math.random() * proverbs.length)]);
  }
});
