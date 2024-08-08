import React, {useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {Layout, Menu, theme} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import Header from '../../components/header/Header';
import '../../styles/vars.css';

const {Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children, link) {
    return {
        key, icon, children, label: link ? <Link to={link}>{label}</Link> : label,
    };
}

const items = [getItem('Danh Sách', 'sub1',
    <UserOutlined/>, [getItem('Giáo viên', '3', null, null, '/admin/teacher-list'), getItem('Học Viên', '4', null, null, '/admin/student-list'), getItem('Chờ duyệt', '5', null, null, '/admin/pending-list'), getItem('đã duyệt ', '6', null, null, '/admin/teacher/approved'), getItem('Danh Mục Câu Hỏi ', '7', null, null, '/admin/categories'), getItem('Danh sách  Câu Hỏi ', '8', null, null, '/admin/question')]),];


const Master = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const handleLogout = () => {
        navigate('/login');
    };

    return (<Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Sider
            // style={{
            //     backgroundColor: '#5a2c82'
            // }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={250}
            theme={'light'}
        >
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}/>
        </Sider>
        <Layout>
            <Header
                style={{
                    padding: 0,
                    background: 'var(--color-primary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
            </Header>
            <Content
                style={{
                    margin: '0 16px',
                }}
            >

                <div
                    style={{
                        padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG,
                    }}
                >
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
    </Layout>);
};

export default Master;
