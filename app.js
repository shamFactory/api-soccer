const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const config     = require('./config');
const app        = express();
const http       = require('http').Server(app);
const { fail } = require('./app/utils/response')

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

app.use((req, res, next) => {
	if (req.url == '/')
		return ok(res)({})

  return fail(res)("'Route '"+req.url+"' Not found.", 404)
});

// 500 - Any server error
app.use((err, req, res, next) => {
  return fail(res)(err, 500)
});

const port = config.port || 4000;
http.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});