const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    DB: 'mongodb://'+process.env.MONGODB_URL+'/'+process.env.MONGODB_DB,
    port: process.env.PORT
};