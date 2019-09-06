const express = require('express')
const { ok, fail } = require('../utils/response')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UpdatesRepository = require('../repositories/updates.repository');
//const http = require("http");
const https = require('https')

class DataService {
  constructor (model, path) {
    this.model = model
    this.path = path
  }

  callApi(callback) {
    return new Promise(
      (resolve, reject) => {
        const options = {
          port: 443,
          hostname: 'api.football-data.org',
          path: '/v2/competitions',
          method: 'GET',
          headers: {
            "X-Auth-Token": '3eec30c0ebb242a19c4e7543504823cc'
          }
        }

        const req = https.request(options, res => {
          let json = '';

          // A chunk of data has been recieved.
          res.on('data', (chunk) => {
            json += chunk;
          });

          // The whole response has been received. Print out the result.
          res.on('end', () => {
            let data = JSON.parse(json);
            new UpdatesRepository().create({url: this.path})
            
            if (data.count == undefined) {
              data[this.path] = [data]
            }

            data[this.path].forEach(m => {
              this.model.getModel().update({id: 11}, data.competitions[0], {upsert: true, setDefaultsOnInsert: true}, function(res){
                console.log(res)
              })
            })

            /*const bulk = this.model.initializeUnorderedBulkOp({useLegacyOps: true});

            bulk.find( { id: 1 } ).upsert().update(
               {
                 $set: data.competitions[0]
               }
            );
            bulk.execute();*/
            /*data.forEach(m => {
              this.model.create(m)
            })*/
            resolve(data)
          });
        })

        req.on('error', error => {
          console.error(error)
        })

        req.end()
        
    }).then(data => {
      return callback()
    });
  }

  getData (req, res, next, callback) {
    return new UpdatesRepository()
      .wasUpdated(this.path)
      .then(res => {

        if (res > 0)
          return callback();
        
        return this.callApi(callback)
      })
      .then(ok(res))
      .catch(fail(res))
  }

  list (req, res, next) {
    let model = this.model;
    return this.getData(req, res, next, function(){
        return model
          .findAll()
      })
  }

}

module.exports = DataService