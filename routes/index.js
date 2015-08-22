//modules

import express from 'express';

//plugins
import config  from '../config';
import Reader  from './lib/reader';
import _       from 'lodash';
import async   from 'async';
import md      from 'marked';

var reader    = new Reader(config.reader ? config.reader : {});

var app = express();

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
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.jsonp(payload.proverbs);
  }
});

app.get('/random', function(req,res) {
  var payload = getProverbs();

  if (payload.error) {
    res.send('404', payload);
  } else {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.jsonp(payload.proverbs[Math.floor(Math.random() * payload.proverbs.length)]);
  }
});

export default app;
