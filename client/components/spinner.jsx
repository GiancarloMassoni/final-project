import React from 'react';
import DotLoader from 'react-spinners/DotLoader';

const Spinner = () => {
  return (
    <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
      <DotLoader color="#52bfd9" size={100} />
    </div>
  );
};

export default Spinner;
