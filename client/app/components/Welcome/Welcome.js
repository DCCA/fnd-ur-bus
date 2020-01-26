import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome m3 flex flex-column justify-center">
      <h1>Welcome</h1>
      <h3>Choose one of the options below:</h3>
      <Link
        className="mt2 p2 inline-block border rounded center buttons"
        to="/home"
      >
        Search by current location
      </Link>
      {/* <Link className="inline-block" to="/" onClick={e => e.preventDefault()}>
        Search by typed address
      </Link>
      <Link className="inline-block" to="/" onClick={e => e.preventDefault()}>
        Search by bus line
      </Link> */}
    </div>
  );
};

export default Welcome;
