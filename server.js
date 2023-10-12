const routes = require('./routes')

const express = require('express');
const mongoose = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

mongoose.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});
