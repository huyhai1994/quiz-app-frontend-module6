import React, {useState} from 'react';

import {Link, Outlet, useNavigate} from 'react-router-dom';
import {Layout, Menu, theme} from 'antd';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import '../../../styles/vars.css';

const {Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children, link) {
    return {
        key, icon, children, label: link ? <Link to={link}>{label}</Link> : label,
    };
}

const items = [
    getItem('Trang chủ', '1', null, null, '/student/home'),
    getItem('Danh Sách', 'sub1',
        <ViewListIcon/>, [
            getItem('Lớp học', '2', null, null, '/student/class-list'), getItem('Bài kiểm tra', '3', null, null, '/student/test-list'),]), getItem('Cài đặt', 'sub2',
        <SettingsIcon/>, [
            getItem('Thông tin cá nhân', '4', null, null, '/student/profile'), getItem('Thay đổi mật khẩu', '5', null, null, '/student/change-password'),],),


];

const StudentHome = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const handleLogout = () => {
        navigate('/login');
    };

    return (<Layout style={{minHeight: '100vh'}}>
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={250}
            theme={'light'}
        >
            <div style={{padding: '16px', textAlign: 'center'}}>
                <h1 className='logo'>QUIZZ</h1>
            </div>
            <Menu defaultSelectedKeys={['1']} mode="inline" items={items}/>
        </Sider>
        <Layout>
            <Content
                style={{
                    margin: '0 16px',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100vh',
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <div style={{padding: ' 5% 10%'}}>
                    <Outlet/>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    </Layout>);
};

export default StudentHome;
