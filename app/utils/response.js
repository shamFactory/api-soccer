
const structure = (error, records) => { return {'error': error, 'records':records} }

const ok = res => data => res.json(structure(false, data))

const fail = res => error => res.status(404).send(structure(true, error))


module.exports = {
  ok,
  fail,
  structure
}
