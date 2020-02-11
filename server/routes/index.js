const API_KEY = process.env.API_KEY;
const API_MAPS_KEY = process.env.API_MAPS_KEY;
const rp = require('request-promise');

module.exports = app => {
  // Get Bus Stops Near the User
  app.get('/get-bus-stops', (req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    const urlApi =
      'https://api.translink.ca/rttiapi/v1/stops?apikey=' +
      API_KEY +
      '&lat=' +
      lat +
      '&long=' +
      long;
    let options = {
      url: urlApi,
      headers: {
        'content-type': 'application/JSON'
      },
      json: true
    };
    rp(options)
      .then(data => res.send(data.filter(elem => elem.Routes !== '')))
      .catch(err => console.log(err));
    // Filter if .busStops.Routes is empty
  });
  // Get bus estimates based on the bus stop selected
  app.get('/get-bus-estimates', (req, res) => {
    let stops = req.query.stops;
    const urlApi =
      'https://api.translink.ca/rttiapi/v1/stops/' +
      stops +
      '/estimates?apikey=' +
      API_KEY;
    let options = {
      url: urlApi,
      headers: {
        'content-type': 'application/JSON'
      },
      json: true
    };
    rp(options)
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });
  // Send api key for maps
  app.get('/set-maps', (req, res) => {
    res.send(API_MAPS_KEY);
  });
};
