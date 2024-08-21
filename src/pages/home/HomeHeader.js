import React from 'react';
import {Link, useNavigate} from "react-router-dom";

import {useSelector} from "react-redux";

const HomeHeader = () => {

    return (
        <header>
            <nav className="navbar">
                <div className="navbar-brand"><Link to={'/'}>Quizizz</Link></div>
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
