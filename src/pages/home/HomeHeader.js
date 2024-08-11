import React from 'react';
import {Link} from "react-router-dom";
import {Menu} from "antd";

const HomeHeader = () => {
    return (
        <header>
        <nav className="navbar">
            <div className="navbar-brand">Quizizz</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/profile">Your Profile</Link>
                </Menu.Item>
            </Menu>
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
