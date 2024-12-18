import React from 'react';
import { RingLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="loading-modal">
      <div className="modal-content">
        <RingLoader size={150} color={'#123abc'} />
      </div>
    </div>
  );
};

export default Spinner;