import express from 'express';

import path from 'path';
import routes from './routes';

//plugins
import bodyParser from 'body-parser';

var app     = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.listen(3000 || process.env.PORT, () => {
	console.log('Server running.');
});

export default app;
