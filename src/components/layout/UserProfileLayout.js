import {UserOutlined, LockOutlined } from '@ant-design/icons'
import {Layout, Menu} from 'antd'
import {Link, Outlet, useLocation} from 'react-router-dom'
import React, {useState} from "react";

const {Sider, Content, Footer} = Layout

const UserProfileLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation();

    const items = [
        {
            key: 'setting',
            icon: <UserOutlined />,
            label: 'Setting Profile',
            children: [
                {
                    key: 'profile',
                    icon: <UserOutlined />,
                    label: <Link to="/profile">Your Profile</Link>,
                },
                {
                    key: 'change-password',
                    icon: <LockOutlined />,
                    label: <Link to="/profile/change-password">Change Password</Link>,
                },
            ],
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme={'light'}
            >
                <div style={{padding: '16px', textAlign: 'center'}}>
                    <h1 className='logo'>QUIZZ</h1>
                </div>
                <Menu
                    theme="light"
                    defaultSelectedKeys={['profile']}
                    mode="inline"
                    items={items}
                    selectedKeys={[location.pathname === '/profile/change-password' ? 'change-password' : 'profile']}
                />
            </Sider>
            <Layout className="site-layout">
                <Content style={{margin: '0 16px'}}>
                    <div style={{padding: 24, minHeight: 360}}>
                        <Outlet />
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
        </Layout>
    )
}

export default UserProfileLayout