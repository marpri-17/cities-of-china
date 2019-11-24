import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylesheets/layouts/filter.scss';


const FilterByName = ({ handleFilterByName }) => {
    return (
        <>
            <div className="filter__wrapper">
                <FontAwesomeIcon icon="search" />
                <input type="text" className="filter__inputname" placeholder="Search city by Name" onKeyUp={handleFilterByName} />
            </div>
            <hr />
        </>
    )
}

export default FilterByName;