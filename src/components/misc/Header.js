import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <React.Fragment>
            <header className="bg-image">
                <div className="bg-container">
                    <h1>SpaceX</h1>
                    <h2>Explore the Universe</h2>
                    <a href="#rockets">Our Rockets</a>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;