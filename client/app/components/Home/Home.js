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
    <div>
      <button onClick={fetchBusStops}>API Test</button>
      <button onClick={fetchCoordinatesHandler}>Get Bus Stops</button>
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
    </div>
  );
};

export default Home;
