const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const config     = require('./config');
const app        = express();
const http       = require('http').Server(app);
const { structure } = require('./app/utils/response')

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/competitions', require('./app/routes/competitions.route'));
app.use('/team', require('./app/routes/team.route'));
app.use('/players', require('./app/routes/players.route'));

app.use(function(req, res, next) {
  return res.status(404).send(structure(true, 'Route'+req.url+' Not found.'))
});

// 500 - Any server error
app.use(function(err, req, res, next) {
  return res.status(500).send(structure(true, err))
});

const port = config.port || 4000;
http.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});