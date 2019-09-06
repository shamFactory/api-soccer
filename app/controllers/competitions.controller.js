const DataService = require('../services/data.service');
const CompetitionsRepository = require('../repositories/competitions.repository');

class CompetitionsController {

  index(req, res, next) {
    new DataService(new CompetitionsRepository, 'competitions').list(req, res, next);
  }

}
module.exports = CompetitionsController
