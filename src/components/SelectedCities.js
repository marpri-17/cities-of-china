import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SelectedCities = ({ selectedCities, handleDeleteCity }) => {
    return (
        <div className="main__selected_wrapper">
            <ul className="main__selected_list">
                {selectedCities.length ? selectedCities.map(city =>
                    <li key={city.id} className="main__selected_item" data-id={city.id} onClick={handleDeleteCity} >
                        <img src="./images/landscape.svg" alt="" className="main__list_img" />
                        <div className="main__list_infowrapper">
                            <p>{city.name}</p>
                            <p lang="zh">{city.chineseName}</p>
                        </div>
                        <FontAwesomeIcon icon="times" />
                    </li>) : "Aquí la lista de los seleccionados"
                }
            </ul>
        </div>)
}

export default SelectedCities