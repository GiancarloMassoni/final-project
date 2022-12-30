import React, { useEffect, useRef } from 'react';
import NavBar from '../components/nav-bar';
const apiKey = 'AIzaSyCBRdqeJ86bHRgRmeiT_-iMdcriyLC1mtg';
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

  const searchInput = useRef(null);

  const onChangeAddress = autocomplete => {
    // const place = autocomplete.getPlace();
    // const longitude = place.geometry.viewport.Ia.lo;
    // const latitude = place.geometry.viewport.Wa.lo;
    // console.log('longitude', longitude);
    // console.log('latitude', latitude);

  };

  const initAutoComplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(['address_component', 'geometry']);
    autocomplete.addListener('place_changed', () => onChangeAddress(autocomplete));
  };

  const reverseGeoCode = ({ latitude: lat, longitude: lng }) => {
    // console.log(lat, lng);
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
  });

  return (

    <div>
      <NavBar />
      <div className='row text-center'>
        <div className='col-full'>
          <form>
            <label htmlFor="address" className='block padding'>
              Enter Address to view nearby restaurant menus
            </label>
            <input type="text" placeholder='Address' required className='address-input'
              ref={searchInput} />
            <i className="fa-sharp fa-solid fa-location-dot" onClick={findMyLocation} />
          </form>
        </div>
      </div>
    </div>
  );
}
