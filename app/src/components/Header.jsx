import React from 'react';
// importing styles 
import './styles/Header.css';
// importing images
import logo from '../assets/images/logo.svg';
import uploadIcon from '../assets/images/upload_icon.svg';

class Header extends React.Component {
    render() {
        console.log('Header')
        return (
            <header className="fluid">
                <div className="container header-container flex-container">
                    <div className="logo-container">
                        <img className="clickeable" src={logo} alt="FileShare logo" />
                    </div>
                    <div className="upload-button-container flex-r-y-centered clickeable">
                        <h5 className="upload-label">Upload File</h5>
                        <div className="upload-file-container">
                            <img src={uploadIcon} alt="Icon representing upload action button" />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;