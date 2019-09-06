const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
let Players = new Schema({
    id: {
        type: Number, 
        required: true
    },
    name: {
    	type: String, 
    	required: true, 
    	max: 100
   	},
    plan: {
    	type: String
    },
},{
    collection: 'players'
});


// Export the model
module.exports = mongoose.model('Players', Players);