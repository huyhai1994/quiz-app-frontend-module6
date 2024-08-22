import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice';
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal } from 'antd';
import './HomeHeader.css'; // Import a CSS file for custom styles

const HomeHeader = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const handleLogout = async () => {
        try {
            await dispatch(logout());
            setIsLogoutModalVisible(false);
            navigate('/');
        } catch (error) {
            console.log('Logout failed: ', error);
        }
    };

    const handleDropdownVisibilityChange = (visible) => {
        setIsDropdownVisible(visible);
    };

    const showLogoutModal = () => {
        setIsLogoutModalVisible(true);
    };

    const hideLogoutModal = () => {
        setIsLogoutModalVisible(false);
    };

    const dropdownMenu = (
        <Menu>
            <Menu.Item key="profile">
                <Link to="/admin/profile">Hồ sơ của bạn</Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={showLogoutModal}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <header>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to={'/'}>Quizizz</Link>
                </div>
                <div className="navbar-links">
                    {isAuthenticated ? (
                        <Dropdown
                            overlay={dropdownMenu}
                            onVisibleChange={handleDropdownVisibilityChange}
                            visible={isDropdownVisible}
                        >
                            <div className="user-profile">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="User Avatar" className="user-avatar" />
                                ) : (
                                    <UserOutlined className="user-avatar"  style={{width:"5rem"}}/>
                                )}
                                <div className="user-name">{user?.name}</div>
                            </div>
                        </Dropdown>
                    ) : (
                        <button className="sign-in">
                            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                                Đăng nhập
                            </Link>
                        </button>
                    )}
                </div>
            </nav>

            <Modal
                title="Xác nhận đăng xuất"
                visible={isLogoutModalVisible}
                onOk={handleLogout}
                onCancel={hideLogoutModal}
                okText="Đăng xuất"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn đăng xuất không?</p>
            </Modal>
        </header>
    );
};

export default HomeHeader;