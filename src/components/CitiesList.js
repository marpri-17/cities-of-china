import React from 'react';
import '../stylesheets/layouts/main.scss'

const CitiesList = ({ cities }) => {
    return (
        <div className="main__list_wrapper">
            <label className="main__list_selectAll-label">
                <input type="checkbox" /> {cities.length} items
            </label>
            <ul className="main__list">
                {cities.map(city => {
                    return (
                        <li key={city.id} className="main__list_item">
                            <input type="checkbox" />
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