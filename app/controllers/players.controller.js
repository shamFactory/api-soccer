const PlayersRepository = require('../repositories/players.repository');
const { ok, fail } = require('../utils/response')

class PlayersController {

  index (req, res, next) {
    return new PlayersRepository().findAll()
    	.then(ok(res))
      .catch(fail(res));
  }
}
module.exports = PlayersController
