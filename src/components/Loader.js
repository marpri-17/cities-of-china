import React from 'react';
import '../stylesheets/layouts/loader.scss';

const Loader = () => {
    return (
        <div className="loader__wrapper">
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Loader;
