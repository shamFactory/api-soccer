const DataService = require('./data.service');
const PlayersRepository = require('../repositories/players.repository');

class TeamService extends DataService {
 
  constructor (model, path) {
    super(model, path)
    this.model = model
    this.path = path
  }

  one (req, res, next) {
    let model = this.model;
    let id = this.getIdPath();
    return this.getData(req, res, next, function(data){
      if (data == undefined || data.length) 
        return model.find(id)

      return new PlayersRepository().createOrUpdate(data['squad'])
          .then(res => {
            return model.find(id)
          })        
      })
  }

}

module.exports = TeamService