
const ok = res => data => res.json({'error':false, 'records':data})

const fail = res => error => res.status(404).send({'error': true, 'records':error})

module.exports = {
  ok,
  fail
}
