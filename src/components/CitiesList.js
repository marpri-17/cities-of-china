import React from 'react';
import '../stylesheets/layouts/main.scss'

const CitiesList = ({ cities, handleCityCheckbox }) => {
    return (
        <div className="main__list_wrapper">
            <label className="main__list_selectAll-label">
                <input type="checkbox" /> {cities.length} items
            </label>
            <ul className="main__list">
                {cities.map(city => {
                    return (
                        <li key={city.id} className="main__list_item" data-id={city.id}>
                            <input type="checkbox" onClick={handleCityCheckbox} />
                            <img src="./images/landscape.svg" alt="" className="main__list_img" />
                            <div className="main__list_infowrapper">
                                <p>{city.name}</p>
                                <p lang="zh">{city.chineseName}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


export default CitiesList;