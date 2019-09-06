const BaseRepository = require('./base.repository');
const Competitions = require('../models/competitions.model')
const { ok, fail } = require('../utils/response')

class CompetitionsRepository extends BaseRepository {
	constructor () { 
		super(Competitions, 'id') 
	}
}

module.exports = CompetitionsRepository