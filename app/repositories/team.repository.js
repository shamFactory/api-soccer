const BaseRepository = require('./base.repository');
const Team = require('../models/team.model')

class TeamRepository extends BaseRepository {
	constructor () { 
		super(Team, 'id') 
	}
}

module.exports = TeamRepository