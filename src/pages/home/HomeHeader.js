import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Menu} from "antd";
import {useSelector} from "react-redux";

const HomeHeader = () => {
    const navigate = useNavigate();
    const {isAuthenticated, role} = useSelector(state => state.auth);

    const handleProfileClick = () => {
        if(isAuthenticated) {
            switch (role) {
                case "ROLE_ADMIN":
                    navigate("/admin/profile");
                    break
                case "ROLE_TEACHER":
                    navigate("/teacher/profile");
                    break
                case "ROLE_STUDENT":
                    navigate("/student/profile");
                    break
                default:
                    navigate("/profile");
            }
        } else {
            navigate("/login");
        }
    }

    return (
        <header>
            <nav className="navbar">
                <div className="navbar-brand">Quizizz</div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={handleProfileClick}>
                        Your Profile
                    </Menu.Item>
                </Menu>
                <div className="navbar-links">
                    {!isAuthenticated && (
                        <button className="sign-in">
                            <Link to="/login" style={{color: 'inherit', textDecoration: 'none'}}>
                                Đăng nhập
                            </Link>
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default HomeHeader;
