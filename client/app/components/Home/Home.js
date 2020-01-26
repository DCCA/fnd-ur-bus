import React, { useState } from "react";

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
        console.log(response);
        setBusStops(response);
      })
      // Runs when error
      .catch(error => {
        setIsLoading(false);
        setErrorList(error);
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
        console.log(response);
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
      <div className="flex flex-column m3">
        <button onClick={fetchCoordinatesHandler}>Get Coords</button>
        <button onClick={fetchBusStops}>Get Bus Stops</button>
      </div>
      <p className="m2">You are here: \/</p>
      <p>
        Latitude: {coordinates.lat} Longitude: {coordinates.long}
      </p>
      {Object.keys(busStops).map(keys => {
        console.log(busStops[keys].StopNo);
        return (
          <div
            value={busStops[keys].StopNo}
            className="mt3"
            onClick={fetchEstimates.bind(this)}
          >
            <h1>Name: {busStops[keys].Name}</h1>
            <p>On Street: {busStops[keys].OnStreet}</p>
          </div>
        );
      })}
      {Object.keys(estimates).map(keys => {
        return (
          <div className="mt3">
            <h1>
              Name / Num: {estimates[keys].RouteName} /{" "}
              {estimates[keys].RouteNo}
            </h1>
            <p>Direction: {estimates[keys].Direction}</p>
            {estimates[keys].Schedules.map(e => {
              return (
                <div>
                  <p>Next bus in: {e.ExpectedCountdown}</p>
                  <p>Scheduled: {e.ExpectedLeaveTime}</p>
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
