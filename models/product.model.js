const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
let Product = new Schema({
    name: {
    	type: String, 
    	required: true, 
    	max: 100
   	},
    description: {
    	type: String
    },
    price: {
    	type: Number, 
    	required: true
    },
},{
    collection: 'product'
});


// Export the model
module.exports = mongoose.model('Product', Product);