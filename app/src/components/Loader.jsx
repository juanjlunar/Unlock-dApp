import React from 'react';
import './styles/Loader.css';

const Loader = props => {
    return (
        <div className={`full-width ${props.className ? props.className : ''}`}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
}
export default Loader;