const DataService = require('../services/data.service');
const CompetitionsRepository = require('../repositories/competitions.repository');

class CompetitionsController {

  index (req, res, next) {
    new DataService(new CompetitionsRepository, 'competitions').list(req, res, next);
  }

  detail (req, res, next) {
    new DataService(new CompetitionsRepository, 'competitions/'+req.params.id).one(req, res, next);
  }

}
module.exports = CompetitionsController
