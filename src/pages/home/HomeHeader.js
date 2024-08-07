import React from 'react';
import {Link} from "react-router-dom";

const HomeHeader = () => {
    return (<header>
        <nav className="navbar">
            <div className="navbar-brand">Quizizz</div>
            <div className="navbar-links">
                <button className="sign-in">
                    <Link to="/login" style={{color: 'inherit', textDecoration: 'none'}}> Đăng nhập
                    </Link>
                </button>
            </div>
        </nav>
    </header>);
}

export default HomeHeader;
