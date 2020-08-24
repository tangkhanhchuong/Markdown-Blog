
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

//to use delete route in html
app.use(methodOverride('_method'));

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


//parse body to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use('/', indexRouter);

//connect to mongodb
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.upzro.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  })
});

module.exports = app;
