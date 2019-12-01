import React from 'react';

const CityItem = ({ city, handleCityCheckbox }) => {
    return (
        <li key={city.id} className="main__list_item" data-id={city.id}>
            <input type="checkbox" onChange={handleCityCheckbox} name="listinput" checked={city.isSelected} />
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
