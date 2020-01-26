import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Set States
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    long: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [busStops, setBusStops] = useState({});
  const [estimates, setEstimates] = useState({});

  // Get coordinations from user
  const fetchCoordinatesHandler = async () => {
    setIsLoading(true);
    try {
      const { coords } = await getCurrentPosition();
      const { latitude, longitude } = coords;
      // Handle coordinates
      setCoordinates({
        lat: latitude.toFixed(5),
        long: longitude.toFixed(5)
      });
      // Loading
      setIsLoading(false);
    } catch (error) {
      // Handle error
      console.error(error);
      setIsLoading(false);
    }
  };

  function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true
      });
    });
  }

  // Get the bus stops, based on the coordinates from user
  const fetchBusStops = () => {
    setIsLoading(true);
    // ?id=" + props.match.params.id)
    fetch("/get-bus-stops?lat=" + coordinates.lat + "&long=" + coordinates.long)
      // Runs when success
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        setBusStops(response);
      })
      // Runs when error
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  // Get the next 6 buses that will serve that bus stop
  const fetchEstimates = event => {
    const stop = event.currentTarget.getAttribute("value");
    setIsLoading(true);

    fetch("/get-bus-estimates?stops=" + stop)
      // Runs when success
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        setEstimates(response);
      })
      // Runs when error
      .catch(error => {
        setIsLoading(false);
        setErrorList(error);
      });
  };

  // Handle loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="m3">
      <h1>Welcome</h1>
      <h3>Choose one of the options below:</h3>
      <Link className="inline-block" to="/">
        Search by current location
      </Link>
      <Link className="inline-block" to="/">
        Search by typed adress
      </Link>
      <Link className="inline-block" to="/">
        Search by bus line
      </Link>
      <div className="flex flex-column m3">
        <button
          className="rounded m1 p1 bold"
          onClick={fetchCoordinatesHandler}
        >
          Get Coords
        </button>
        <button
          className="rounded m1 p1 bold"
          onClick={fetchBusStops}
          disabled={coordinates.lat === 0}
        >
          Get Bus Stops
        </button>
      </div>
      <div className="border rounded p1">
        <p className="p1">You are here: \/</p>
        <p className="p1">Latitude: {coordinates.lat}</p>
        <p className="p1">Longitude: {coordinates.long}</p>
      </div>
      {Object.keys(busStops).map(keys => {
        return (
          <div
            value={busStops[keys].StopNo}
            className="mt3 p2 border rounded flex"
            onClick={fetchEstimates.bind(this)}
          >
            <img src="https://via.placeholder.com/100"></img>
            <div className="p2 flex flex-column">
              <h1 className="p1 bold h3">Name:</h1>
              <h1 className="p1">{busStops[keys].Name}</h1>
              <p className="p1 h3">On Street:</p>
              <p className="p1">{busStops[keys].OnStreet}</p>
              <p className="p1 h3">Routes:</p>
              <p className="p1">{busStops[keys].Routes}</p>
              <button className="m1 flex-auto">Select</button>
            </div>
          </div>
        );
      })}
      {Object.keys(estimates).map(keys => {
        return (
          <div className="mt3 p2 border rounded">
            <h1>
              Name / Num: {estimates[keys].RouteName} /{" "}
              {estimates[keys].RouteNo}
            </h1>
            <p className="mt2 mb2">Direction: {estimates[keys].Direction}</p>
            {estimates[keys].Schedules.map(e => {
              return (
                <div className="border rounded pt1 pb1 mt1 mb1">
                  <p className="p1">Next bus in: {e.ExpectedCountdown}</p>
                  <p className="p1">Scheduled: {e.ExpectedLeaveTime}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
