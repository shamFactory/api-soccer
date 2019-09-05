const CompetitionsService = require('../models/competitions.service');

exports.index = function (req, res, next) {
  Product.find(function (err, product) {
    if (err) return next(err);
    res.send(product);
  });
};