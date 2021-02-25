const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const geoJson = require('./geojson.js');
const weatherData = require('./weather.js');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const { formatLocation, mungeWeather } = require('./munging-functions.js');




app.get('/location', async(req, res) => {
  try {
    const formattedResponse = formatLocation(geoJson);
    
    res.json(formattedResponse);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {    
    const finalResponse = mungeWeather(weatherData);

    res.json(finalResponse);

  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;


