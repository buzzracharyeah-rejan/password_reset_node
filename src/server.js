const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { dbService } = require('./db');

const authRoute = require('./routes/authRoute');
const app = express();

// app level middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', authRoute); 

const PORT = process.env.PORT || 3000;

// error handler
app.use((err, req, res, next) => {
  console.log(err)
  return res.status(500).json({
    status: 'failed', 
    message: err.message
  })
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  dbService.db_connect();
});
