import React from 'react';

const HomeHeader = () => {
    return (<header>
            <nav className="navbar">
                <div className="navbar-brand">Quizizz</div>
                <div className="navbar-links">
                    <a href="#for-schools">For Schools</a>
                    <a href="#plans">Plans</a>
                    <a href="#solutions">Solutions</a>
                    <a href="#resources">Resources</a>
                    <a href="#for-business">For Business</a>
                    <button className="sign-in">Sign In</button>
                </div>
            </nav>
        </header>);
}

export default HomeHeader;
