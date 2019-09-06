const BaseRepository = require('./base.repository');
const Competitions = require('../models/competitions.model')

class CompetitionsRepository extends BaseRepository {
	constructor () { 
		super(Competitions, 'id') 
	}
}

module.exports = CompetitionsRepository