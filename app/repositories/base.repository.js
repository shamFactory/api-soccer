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

  create (data) {
    return this.model
      .create(data)
  }

  getModel() {
    return this.model;
  }

}

module.exports = BaseRepository