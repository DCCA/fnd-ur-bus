import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="m3">
      <h1>Welcome</h1>
      <h3>Choose one of the options below:</h3>
      <Link className="inline-block" to="/home">
        Search by current location
      </Link>
      <Link className="inline-block" to="/" onClick={e => e.preventDefault()}>
        Search by typed address
      </Link>
      <Link className="inline-block" to="/" onClick={e => e.preventDefault()}>
        Search by bus line
      </Link>
    </div>
  );
};

export default Welcome;
