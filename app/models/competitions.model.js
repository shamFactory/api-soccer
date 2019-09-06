const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
let Competitions = new Schema({
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
    collection: 'competitions'
});


// Export the model
module.exports = mongoose.model('Competitions', Competitions);