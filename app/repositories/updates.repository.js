const BaseRepository = require('./base.repository');
const Updates = require('../models/updates.model')
const { ok, fail } = require('../utils/response')
const config = require('../../config')

class UpdatesRepository extends BaseRepository {
	constructor () { 
		super(Updates, 'url') 
	}

	wasUpdated(url) {
		return this.model.find({ 
		  "url": url,
		  "createdAt" : { 
		    $lt: new Date(), 
		    $gte: new Date(new Date().setDate(new Date().getDate()-config.refresh_since))
		  }   
		}).countDocuments();
	}
}

module.exports = UpdatesRepository