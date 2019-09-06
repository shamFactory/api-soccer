const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    DB: 'mongodb://'+process.env.MONGODB_URL+'/'+process.env.MONGODB_DB,
    port: process.env.PORT,
    api_host: process.env.API_HOST,
    api_port: process.env.API_PORT,
    api_version: process.env.API_VERSION,
    api_key: process.env.API_KEY,
};