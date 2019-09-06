const { structure } = require('../utils/response')

const verifyKey = (req, res, next) => {

  if (req.params.hasOwnProperty('id') && !req.params.id.match(/^[0-9]+$/i)) {

    return res.status(400).send(structure(true, 'only numbers are allowed as parameters'))
  }

  next()
}

module.exports = {
  verifyKey
}