import React from 'react';
import {Link} from "react-router-dom";
import './HomeHeader.css'; // Import a CSS file for custom styles

const HomeHeader = () => {

    return (
        <header>
            <nav className="navbar">
                <div className="navbar-brand">Quiz</div>
                <div className="navbar-links">
                    <button className="sign-in">
                        <Link to="/login" style={{color: 'inherit', textDecoration: 'none'}}>
                            Đăng nhập
                        </Link>
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default HomeHeader;
