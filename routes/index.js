//modules

var express   = require('express');
var app       = module.exports = express();

var cache     = require('memory-cache');

//plugins
var cors      = require('cors');

var config    = require('../config');
var Reader    = require('./lib/reader');
var reader    = new Reader(config.reader ? config.reader : {});
var _         = require('lodash');
var async     = require('async');
var md        = require('marked');


//plugins
app.use(cors());

//routes
app.get('/', function(req,res) {
  var payload = getProverbData();

  cache.put('proverbs', payload);

  if (payload.error) {
    res.send('404', payload);
  } else {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.jsonp(payload.proverbs);
  }
});

app.get('/random', function(req,res) {
  var payload = getProverbData();

  if (payload.error) {
    res.send('404', payload);
  } else {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.jsonp(payload.proverbs[Math.floor(Math.random() * payload.proverbs.length)]);
  }
});

function getProverbData() {
  var proverbs = cache.get('proverbs');
  if(proverbs) {
    return proverbs;
  }

  proverbs = getProverbs();

  cache.put('proverbs', proverbs, (1000 * 60 * 60 * 24 * 3));

  return proverbs;
}

function getProverbs() {
  var slug = [''];
  var payload = {};
  payload = reader.getFile(slug);

  return payload;
};


module.exports = app;
