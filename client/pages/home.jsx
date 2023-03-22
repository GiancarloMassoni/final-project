import React, { useEffect, useRef, useState, useContext } from 'react';
import AppContext from '../lib/app-context';
import Spinner from '../components/spinner';
const apiKey = process.env.REACT_APP_API_KEY;
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';

function loadAsyncScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    Object.assign(script, {
      type: 'text/javascript',
      async: true,
      src
    });
    script.addEventListener('load', () => resolve(script));
    document.head.appendChild(script);
  });
}
const initMapScript = () => {
  if (window.google) {
    return Promise.resolve();
  }
  const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
  return loadAsyncScript(src);
};

export default function Home() {
  const [locations, setLocations] = useState({ locations: ['no results'] });
  const [searched, setSearched] = useState({ searched: false });
  const [loading, setLoading] = useState(true);
  const searchInput = useRef(null);
  const context = useContext(AppContext);

  const onChangeAddress = autocomplete => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    const longitude = place.geometry.viewport.Ja.lo;
    const latitude = place.geometry.viewport.Va.lo;
    restaurantReq(longitude, latitude);

  };

  const initAutoComplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(['address_component', 'geometry']);
    autocomplete.addListener('place_changed', () => onChangeAddress(autocomplete));
  };

  const reverseGeoCode = ({ latitude: lat, longitude: lng }) => {
    restaurantReq(lng, lat);
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        reverseGeoCode(position.coords);
      });
    }
  };

  useEffect(() => {
    initMapScript().then(() => { initAutoComplete(); });
    if (locations.locations[0] === 'no results') {
      fetch('https://trackapi.nutritionix.com/v2/locations?ll=34.052235,-118.243683&distance=30mi&limit=10', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': process.env.REACT_APP_X_ID_API_KEY,
          'x-app-key': process.env.REACT_APP_X_KEY_API_KEY
        }
      })
        .then(res => res.json())
        .then(data => {
          setLocations(data);
          setLoading(false);
        })
      // eslint-disable-next-line no-console
        .catch(err => console.log('Fetch Get error:', err));
    }
  }
  );

  const ContextMenuId = id => {
    context.updateMenuId(id);
  };

  const restaurantReq = (lng, lat) => {
    setSearched(true);
    fetch(`https://trackapi.nutritionix.com/v2/locations?ll=${lat},${lng}&distance=30mi&limit=20`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.REACT_APP_X_ID_API_KEY,
        'x-app-key': process.env.REACT_APP_X_KEY_API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setLocations(data);
      }
      )
      // eslint-disable-next-line no-console
      .catch(err => console.log('Fetch Get error:', err));
  };

  if (loading) {
    return <div>{Spinner}</div>;
  }

  if (searched.searched !== false) {
    const LocSetup = (location, index) => {

      const miles = location.distance_km / 0.621371;
      if (index % 2 === 0) {
        return <div className='col-half' key={index}>
          <h2 className='rest-btm'><a href={location.website} target="_blank" rel="noreferrer" className='rest-link'>{location.name}</a></h2>
          <h3>
            <a href={`#restaurants?restaurant=${location.name}`}>
              <button onClick={() => { ContextMenuId(location.name); }} className='menu-btn'>
                Link to items on menu under 500 calories</button></a>
          </h3>
          <h4>{location.address} {location.city} {location.zip} {location.state}</h4>
          <h4> {miles.toFixed(2)} miles away </h4>
        </div>
        ;
      } else {
        return <div className='col-half' key={index}>
          <h2 className='rest-btm'><a href={location.website} target="_blank" rel="noreferrer" className='rest-link'>{location.name}</a></h2>
          <h3>
            <a href={`#restaurants?restaurant=${location.name}`}>
              <button onClick={() => { ContextMenuId(location.name); }} className='menu-btn'>
                Link to items on menu under 500 calories</button></a>
          </h3>
          <h4>{location.address} {location.city} {location.zip} {location.state}</h4>
          <h4> {miles.toFixed(2)} miles away </h4>
        </div>;
      }
    };

    const locArr = locations.locations.map(LocSetup);

    return (

      <div>
        <div className='row text-center'>
          <div className='col-full'>
            <label htmlFor="address" className='block padding'>
              Enter Address to view nearby restaurant menus
            </label>
            <input type="text" placeholder='Address' required className='address-input'
              ref={searchInput} />
            <i className="fa-sharp fa-solid fa-location-dot" onClick={findMyLocation} />
            <div>
              <h1 className='rest-title'>Nearby Restaurants</h1>
              <div className='row'>{locArr}</div>
            </div>
          </div>
        </div>
      </div>
    );

  } else {

    const LocSetup = (location, index) => {

      const miles = location.distance_km / 0.621371;
      if (index % 2 === 0) {
        return <div className='col-half' key={index}>
          <h2 className='rest-btm'><a href={location.website} target="_blank" rel="noreferrer" className='rest-link'>{location.name}</a></h2>
          <h3>
            <a href={`#restaurants?restaurant=${location.name}`}>
              <button onClick={() => { ContextMenuId(location.name); }} className='menu-btn'>
                Link to items on menu under 500 calories</button></a>
          </h3>
          <h4>{location.address} {location.city} {location.zip} {location.state}</h4>
          <h4> {miles.toFixed(2) } miles away </h4>
        </div>
        ;
      } else {
        return <div className='col-half' key={index}>
          <h2 className='rest-btm'><a href={location.website} target="_blank" rel="noreferrer" className='rest-link'>{location.name}</a></h2>
          <h3>
            <a href={`#restaurants?restaurant=${location.name}`}>
              <button onClick={() => { ContextMenuId(location.name); }} className='menu-btn'>
                Link to items on menu under 500 calories</button></a>
          </h3>
          <h4>{location.address} {location.city} {location.zip} {location.state}</h4>
          <h4> {miles.toFixed(2)} miles away </h4>
        </div>;
      }
    };

    const locArr = locations.locations.map(LocSetup);

    return (

      <div>
        <div className='row text-center'>
          <div className='col-full'>
            <label htmlFor="address" className='block padding'>
              Enter Address to view nearby restaurant menus
            </label>
            <input type="text" placeholder='Address' required className='address-input'
                ref={searchInput}/>
            <i className="fa-sharp fa-solid fa-location-dot" onClick={findMyLocation} />
            <div>
              <h1 className='title-rest'>Example Restaurants</h1>
              <div className='row'>{locArr}</div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}
