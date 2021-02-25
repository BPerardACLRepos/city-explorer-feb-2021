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


function formatLocation(someData) {
  return {
    formatted_query: someData[0].display_name,
    latitude: someData[0].lat,
    longitude: someData[0].lon,
  };
}

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
    res.json([
      {
        'forecast': 'Partly cloudy until afternoon.',
        'time': 'Mon Jan 01 2001'
      },
      {
        'forecast': 'Mostly cloudy in the morning.',
        'time': 'Tue Jan 02 2001'
      },
    ]);

  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
