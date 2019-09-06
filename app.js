const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const config     = require('./config');
const app        = express();
const http       = require('http').Server(app);

//const product    = require('./routes/product.route');
//const Product    = require('./models/product.model');



mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use('/products', product);
app.use('/competitions', require('./app/routes/competitions.route'));


const port = config.port || 4000;
http.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});