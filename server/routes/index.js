const API_KEY = process.env.API_KEY;
const request = require("request");

const options = {};

module.exports = app => {
  // API Routes
  // app.get("/get-bus-stops", (req, res) => {
  //   let urlApi =
  //     "https://api.translink.ca/rttiapi/v1/stops?apikey=" +
  //     API_KEY +
  //     "&lat=49.2344&long=-123.1451";
  //   fetch(urlApi)
  //     .then(res => res.send(res.json()))
  //     .then();
  // });
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
};
