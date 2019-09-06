const DataService = require('../services/data.service');
const TeamService = require('../services/team.service');
const TeamRepository = require('../repositories/team.repository');

class TeamController {

  index (req, res, next) {
    new DataService(new TeamRepository, 'teams').list(req, res, next);
  }

  detail (req, res, next) {
    new TeamService(new TeamRepository, 'teams/'+req.params.id).one(req, res, next)
  }

}
module.exports = TeamController
