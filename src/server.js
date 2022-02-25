const express = require('express');
const { dbService } = require('./db');
const app = express();

const PORT = process.env.PORT || 3000; 

// error handler
app.use((err,req,res,next) => console.log(err))
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  dbService.db_connect(); 
});
