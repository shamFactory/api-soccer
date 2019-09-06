const express = require('express')
const { ok, fail } = require('../utils/response')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

class BaseRepository {
  constructor (model, key) {
    this.model = model
    this.modelName = model.modelName.toLowerCase()
    this.key = key
  }

  findAll () {
    return this.model
      .find({});
  }

  find (id) {
    const filter = {}
    filter[this.key] = id

    return this.model
      .findOne(filter);
  }

  create (data) {
    return this.model
      .create(data)
  }

  createOrUpdate (objects) {
    return this.model.bulkWrite(
      objects.map((object) => 
        ({
          updateOne: {
            filter: { 'id' : object.id },
            update: { $set: object },
            upsert: true
          }
        })
      )
    )
  }

}

module.exports = BaseRepository