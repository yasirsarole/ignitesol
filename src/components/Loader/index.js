import React from 'react';

// import assets
import Spinner from '../../assets/Spinner.gif';

const Loader = () => {
    return (
    <figure className="loader"> 
        <img src={Spinner} alt="Loader" />
    </figure>
  )
}

export default Loader;