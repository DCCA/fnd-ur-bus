import React from 'react';

export default function EstimatesCard(props) {
  return (
    <div className='mt3 p2 border rounded'>
      <h1>
        Name / Num: {props.estimates.RouteName} / {props.estimates.RouteNo}
      </h1>
      <p className='mt2 mb2'>Direction: {props.estimates.Direction}</p>
      {props.estimates.Schedules.map(e => {
        return (
          <div className='border rounded pt1 pb1 mt1 mb1'>
            <p className='p1'>Next bus in: {e.ExpectedCountdown}</p>
            <p className='p1'>Scheduled: {e.ExpectedLeaveTime}</p>
          </div>
        );
      })}
    </div>
  );
}
