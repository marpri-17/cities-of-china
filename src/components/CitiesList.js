import React from 'react';
import '../stylesheets/layouts/main.scss'

const CitiesList = ({ cities, handleCityCheckbox, handleSelectAll, selectedCities }) => {
    return (
        <div className="main__list_wrapper">
            <input type="checkbox" onClick={handleSelectAll} />
            <label className="main__list_selectAll-label">
                <span onClick={handleSelectAll}></span> {cities.length} items
            </label>
            <hr />
            <ul className="main__list">
                {cities.map(city => {
                    let isSelected = false;
                    (selectedCities.includes(city)) ? isSelected = true : isSelected = false;
                    return (
                        <li key={city.id} className="main__list_item" data-id={city.id}>
                            {isSelected ? <>
                                <input type="checkbox" onClick={handleCityCheckbox} name="listinput" checked />
                                <label className="main__list_item_label" htmlFor="listinput"><span></span></label>
                            </> : <>
                                    <input type="checkbox" onClick={handleCityCheckbox} name="listinput" />
                                    <label className="main__list_item_label" htmlFor="listinput"><span></span></label>
                                </>}
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