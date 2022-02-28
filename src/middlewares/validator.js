const validateBody = (schema) => (req, res, next) => {
  const {value, error} = schema.validate(req.body)
  if(error) throw new Error(error)
  req.body = value; 
  next()
};

module.exports = {
  validateBody,
};
