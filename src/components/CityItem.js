import React from 'react';

const CityItem = ({ city, handleCityCheckbox }) => {
    return (
        <li key={city.id} className="main__list_item" data-id={city.id}>
            {city.isSelected ? <input type="checkbox" onClick={handleCityCheckbox} name="listinput" checked /> : <input type="checkbox" onClick={handleCityCheckbox} name="listinput" />}
            <label className="main__list_item_label" htmlFor="listinput"><span></span></label>
            <img src="./images/landscape.svg" alt="" className="main__list_img" />
            <div className="main__list_infowrapper">
                <p>{city.name}</p>
                <p lang="zh">{city.chineseName}</p>
            </div>

        </li>
    )
}

export default CityItem