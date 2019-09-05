const BaseService = require('./base.service');
const Competitions = require('../models/competitions.model')

class CompetitionsService extends BaseService {
	constructor () { super(Competitions, 'id') }

}