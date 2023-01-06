import React from 'react';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className='row navbar'>
        <div className='col-full padding'>
          <h1 className='inline '>HealthyHacks</h1>
          <a href="" className='home inline padding'>Home</a>
        </div>
      </div>
    );
  }
}
