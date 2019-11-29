import React, { useState } from 'react';
import CityItem from './CityItem';
import '../stylesheets/layouts/main.scss'

const CitiesList = ({ cities, handleCityCheckbox, handleSelectAll, selectedCities }) => {
    return (
        <div>
            <input type="checkbox" onClick={handleSelectAll} />
            <label className="main__list_selectAll-label">
                <span onClick={handleSelectAll}></span> {cities.length} items
            </label>
            <hr />
            <div className="main__list_wrapper">
                <ul className="main__list">
                    {cities.map(city => {
                        return <CityItem city={city} handleCityCheckbox={handleCityCheckbox} key={city.id} />
                    })}
                </ul>
            </div>
        </div>
    )
}


export default CitiesList;