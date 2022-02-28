const req = require('express/lib/request');

const validateBody = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) throw new Error(error);
  req.body = value;
  next();
};

const validateQuery = (schema) => (req, res, next) => {
  // console.log(req.query)
  const { value, error } = schema.validate(req.query);
  if (error) throw new Error(error);
  req.query = value;
  next();
};

module.exports = {
  validateBody,
  validateQuery,
};
