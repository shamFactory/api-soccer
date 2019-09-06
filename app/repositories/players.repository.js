const BaseRepository = require('./base.repository');
const Players = require('../models/players.model')

class PlayersRepository extends BaseRepository {
	constructor () { 
		super(Players, 'id') 
	}
}

module.exports = PlayersRepository