import React from 'react';
import { Link } from 'react-router-dom';

// import assets
import Back from '../../../assets/Back.svg';
import Search from '../../../assets/Search.svg';
import Cancel from '../../../assets/Cancel.svg';

const SearchContainer = ({pageTitle, onSearchResults}) => {
    return (
        <>
            <Link to="/" className="title">
                <figure className="prev-arrow">
                <img src={Back} alt="Prev Arrow" />
                </figure>
                <h2>{pageTitle}</h2>
            </Link>
            <div className="search-input-container">
                <figure className="search-icon">
                    <img src={Search} alt="Search Icon" />
                </figure>
                <input type="text" placeholder="Search" title="Click ourside for search" onBlur={(e) => onSearchResults(e.target.value)}></input>
                <figure className="cancel-icon">
                    <img src={Cancel} alt="Cancel Icon" />
                </figure>
            </div>
      </>
    )  
}

export default SearchContainer;