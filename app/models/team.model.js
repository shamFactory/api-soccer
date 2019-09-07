const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
let Teams = new Schema({
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
  area: {
    type: Object
  },
  shortName: {
    type: String
  },
  tla: {
    type: String
  },
  crestUrl: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },
  email: {
    type: String
  },
  founded: {
    type: Number
  },
  clubColors: {
    type: String
  },
  venue: {
    type: String
  },
},{
    collection: 'team'
});


// Export the model
module.exports = mongoose.model('Teams', Teams);