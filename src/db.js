const mongoose = require('mongoose');

const dbService = {
  db_connect: (req, res, next) => {
    const uri = process.env.DB_URI;
    const password = process.env.DB_PASSWORD;
    const dbname = process.env.DB_NAME;
    const valid_uri = encodeURI(uri.replace('<password>', password).replace('<dbname>', dbname));
    mongoose
      .connect(valid_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      })
      .then(() => console.log('db connection successful'))
      .catch((e) => next(e));
  },
};

module.exports = {
  dbService,
};
