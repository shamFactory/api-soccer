const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
let Updates = new Schema({
    url: {
    	type: String, 
    	required: true, 
    	max: 100
   	},
    createdAt: {type: Date, default: Date.now},
},{
    collection: 'updates'
});


// Export the model
module.exports = mongoose.model('Updates', Updates);