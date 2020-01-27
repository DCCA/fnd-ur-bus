const API_KEY = process.env.API_KEY;
const API_MAPS_KEY = process.env.API_MAPS_KEY;
const request = require("request");

const options = {};

module.exports = app => {
  // Get Bus Stops Near the User
  app.get("/get-bus-stops", (req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    const urlApi =
      "https://api.translink.ca/rttiapi/v1/stops?apikey=" +
      API_KEY +
      "&lat=" +
      lat +
      "&long=" +
      long;
    let options = {
      url: urlApi,
      headers: {
        "content-type": "application/JSON"
      }
    };
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        let jData = JSON.parse(body);
        res.send(jData);
      }
    });
  });
  // Get bus estimates based on the bus stop selected
  app.get("/get-bus-estimates", (req, res) => {
    let stops = req.query.stops;
    const urlApi =
      "https://api.translink.ca/rttiapi/v1/stops/" +
      stops +
      "/estimates?apikey=" +
      API_KEY;
    let options = {
      url: urlApi,
      headers: {
        "content-type": "application/JSON"
      }
    };
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        let jData = JSON.parse(body);
        res.send(jData);
      }
    });
  });
  // Handle Google Static Maps call
  app.get("/get-maps", (req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    const urlApi =
      "https://maps.googleapis.com/maps/api/staticmap?center=" +
      lat +
      "," +
      long +
      "&zoom=16&size=300x300&maptype=roadmap" +
      "&markers=color:red%7Clabel:C%7C" +
      lat +
      "," +
      long +
      "&key=" +
      API_MAPS_KEY;
    let options = {
      url: urlApi
    };
    console.log(urlApi);
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body);
        res.sendFile(body);
      }
    });
  });
};
