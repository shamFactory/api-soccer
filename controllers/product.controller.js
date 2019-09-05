const Product = require('../models/product.model');

let json = {
	error : false,
	records : null,
};

let getError = function (res, err){
  json.error = true;
  json.records = err;
  res.status(400).json(json);
  json.error = false;
  return res;
}

//List Product method
exports.index = function (req, res, next) {
  Product.find(function (err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

//create new Product method
exports.create = function (req, res, next) {
  let product = new Product(
  {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }
  );

  product.save(function (err) {
    if (err) return getError(res, err);
    json.records = product;
    res.status(200).json(json);
  });
};

//create new Product method (SOCKET)
exports.addProduct = function (io, req) {
  let product = new Product(
  {
    name: req.name,
    description: req.description,
    price: req.price
  }
  );

  product.save(function (err) {
    if (err) return getError(res, err);
    json.records = product;
    res.status(200).json(json);
    io.emit('addedProduct', product);
  });
};

//get Product method
exports.get = function (req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    if (err) return getError(res, err);
    json.records = product;
    res.status(200).json(json);
  });
};

//update Product method
exports.update = function (req, res, next) {
  Product.findOneAndUpdate({'_id': req.params.id}, {$set: req.body}, function (err, product) {
    if (err) return getError(res, err);
    json.records = product;
    res.status(200).json(json);
  });
};


//delete Product method
exports.delete = function (req, res, next) {
  Product.findOneAndDelete({'_id': req.params.id}, function (err) {
    if (err) return getError(res, err);
    json.records = 'Deleted successfully!';
    res.status(200).json(json);
  });
};