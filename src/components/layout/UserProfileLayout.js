import {
    BookOutlined,
    FormOutlined,
    KeyOutlined,
    LockOutlined,
    LogoutOutlined,
    OrderedListOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons'
import {Layout, Menu, Modal} from 'antd'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../features/authSlice";

const {Sider, Content, Footer} = Layout

const UserProfileLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [logoutModalOpen, setLogoutModalOpen] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showLogoutModal = () => {
        setLogoutModalOpen(true)
    }

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            setLogoutModalOpen(false)
            navigate('/');
        } catch (error) {
            console.log('Logout failed: ', error)
        }
    }

    const items = [
        {
            key: 'study',
            icon: <OrderedListOutlined/>,
            label: 'Study',
            children: [
                {
                    key: 'course',
                    icon: <BookOutlined/>,
                    label: 'Course',
                    onClick: () => console.log('Course clicked'),
                },
                {
                    key: 'test',
                    icon: <FormOutlined/>,
                    label: 'Test',
                    onClick: () => console.log('Test clicked'),
                },
            ],
        },
        {
            key: 'setting',
            icon: <SettingOutlined/>,
            label: 'Setting Profile',
            children: [
                {
                    key: 'profile',
                    icon: <UserOutlined/>,
                    label: <Link to="/profile">Your Profile</Link>,
                },
                {
                    key: 'change-password',
                    icon: <LockOutlined/>,
                    label: <Link to="/profile/change-password">Change Password</Link>,
                },
                {
                    key: 'reset-password',
                    icon: <KeyOutlined/>,
                    label: <Link to="/profile/reset-password">Forgot My Password</Link>,
                },
                {
                    key: 'logout',
                    icon: <LogoutOutlined/>,
                    label: 'Logout',
                    onClick: showLogoutModal,
                }
            ],
        },
    ];

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme={'light'}
                width='300px'
            >
                <div style={{padding: '16px', textAlign: 'center'}}>
                    <h1>
                        <Link className='logo' to={'/admin'}>
                            {collapsed ? 'Q' : 'QUIZZ'}
                        </Link>
                    </h1>
                </div>
                <Menu
                    theme="light"
                    defaultSelectedKeys={['profile']}
                    mode="inline"
                    items={items}
                    // selectedKeys={[location.pathname === '/profile/change-password' ? 'change-password' : 'profile']}
                    selectedKeys={[location.pathname.split('/').pop()]}
                />
            </Sider>
            <Layout className="site-layout">
                <Content style={{margin: '0 16px'}}>
                    <div style={{padding: 24, minHeight: 360}}>
                        <Outlet/>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
            <Modal
                title="Logout Confirmation"
                open={logoutModalOpen}
                onOk={handleLogout}
                onCancel={() => setLogoutModalOpen(false)}
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you want to log out</p>
            </Modal>
        </Layout>
    )
}

export default UserProfileLayout
