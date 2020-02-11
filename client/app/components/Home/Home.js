import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BusStopCard from '../BusStopsCard/BusStopCard';
import EstimatesCard from '../EstimatesCard/EstimatesCard';
import Instructions from './Instructions';

const Home = () => {
  // Set States
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    long: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [busStops, setBusStops] = useState({});
  const [showBusStops, setShowBusStops] = useState(false);
  const [estimates, setEstimates] = useState({});
  const [showEstimates, setShowEstimates] = useState(false);
  const [maps, setMaps] = useState({});

  useEffect(() => {
    getMaps();
  }, []);

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
    fetch('/get-bus-stops?lat=' + coordinates.lat + '&long=' + coordinates.long)
      // Runs when success
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        setBusStops(response);
        setShowBusStops(true);
        setShowEstimates(false);
      })
      // Runs when error
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  // Get the next 6 buses that will serve that bus stop
  const fetchEstimates = event => {
    const stop = event.currentTarget.getAttribute('value');
    setIsLoading(true);

    fetch('/get-bus-estimates?stops=' + stop)
      // Runs when success
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        setEstimates(response);
        setShowBusStops(false);
        setShowEstimates(true);
      })
      // Runs when error
      .catch(error => {
        setIsLoading(false);
        setErrorList(error);
      });
  };
  // Get maps
  const getMaps = () => {
    fetch('/set-maps')
      .then(response => response.text())
      .then(response => setMaps(response))
      .catch(error => {
        console.error(error);
      });
  };

  // Handle loading
  if (isLoading) {
    return <p className='m3'>Loading...</p>;
  }

  return (
    <div className='m3'>
      <Instructions />
      <div className='flex flex-column m3'>
        <button
          className='rounded m1 p1 bold'
          onClick={fetchCoordinatesHandler}
        >
          Get Your Location
        </button>
        <button
          className='rounded m1 p1 bold'
          onClick={fetchBusStops}
          disabled={coordinates.lat === 0}
        >
          Get Bus Stops
        </button>
      </div>
      <div className='border rounded p1'>
        <p className='p1'>You are here: \/</p>
        <p className='p1'>Latitude: {coordinates.lat}</p>
        <p className='p1'>Longitude: {coordinates.long}</p>
      </div>
      {showBusStops
        ? Object.keys(busStops).map(keys => {
            return (
              <BusStopCard
                key={busStops[keys].StopNo}
                busStops={busStops[keys]}
                maps={maps}
                fetchEstimates={fetchEstimates}
              />
            );
          })
        : null}
      {showEstimates
        ? Object.keys(estimates).map(keys => {
            return (
              <EstimatesCard
                key={estimates[keys].RouteName}
                estimates={estimates[keys]}
              />
            );
          })
        : null}
    </div>
  );
};

export default Home;
