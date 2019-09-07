const express = require('express')
const { ok, fail } = require('../utils/response')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UpdatesRepository = require('../repositories/updates.repository');
const https = require('https')
const config = require('../../config')

class DataService {
  constructor (model, path) {
    this.model = model
    this.path = path
  }

  callApi(callback) {
    return new Promise(
      (resolve, reject) => {
        const options = {
          port: config.api_port,
          hostname: config.api_host,
          path: '/'+(config.api_version)+'/'+(this.path),
          method: 'GET',
          headers: {
            "X-Auth-Token": config.api_key
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
            
            if (!data.hasOwnProperty('count')) {
              data[this.getNamePath()] = [data]
            }
            const dataApi = {...data}

            this.model.createOrUpdate(data[this.getNamePath()])
              .then(res => {
                resolve(dataApi)
              })

          });
        })

        req.on('error', error => {
          reject(error)
        })

        req.end()
        
    }).then(data => {
      return callback(data)
    }).catch(error => {
      throw error
    });
  }

  getData (req, res, next, callback) {
    return new UpdatesRepository()
      .wasUpdated(this.path)
      .then(res => {
        if (res > 0)
          return callback();
        
        return this.callApi(callback);
      })
      .then((resp) => {
        if(resp == null || resp.length == 0) 
          return fail(res)('Data not found')

        return ok(res)(resp)
      })
      //.then(ok(res))
      .catch(fail(res))
  }

  list (req, res, next) {
    let model = this.model;
    return this.getData(req, res, next, function(){
        return model
          .findAll()
      })
  }

  one (req, res, next) {
    let model = this.model;
    let id = this.getIdPath();
    return this.getData(req, res, next, function(){
        return model
          .find(id)
      })
  }

  getNamePath() {
    return this.path.replace(/[0-9\/]+/gi, '');
  }

  getIdPath() {
    return this.path.replace(/[a-z\/]+/gi, '');
  }

}

module.exports = DataService