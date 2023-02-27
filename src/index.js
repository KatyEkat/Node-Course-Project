const express = require("express");
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('./middlewares/cors');
const logMethodMiddleware = require("./middlewares/logMethod");

require('dotenv').config({ path: '.env' });

const app = express();
const {
  PORT,
  API_URL,
  DB_URL
} = process.env;


mongoose.connect(DB_URL, err => {
  if (err) throw err;
  console.log('Connected to database success');
})

app.use(cors);
app.use(logMethodMiddleware);
app.use(bodyParser.json());
app.use(usersRouter);
app.use(booksRouter);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
});
