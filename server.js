const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const cloudinary = require('cloudinary');

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'TroyCasenSamanthaGerard',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

cloudinary.config({
  cloud_name: 'hokdebgd8',
  api_key: '547924252344177',
  api_secret: '8mLgHjUjaJArpU2VQc7eamF1b0Q',
});

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening to port ${PORT}`));
});
