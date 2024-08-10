import React, {useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {Layout, Menu, theme} from 'antd';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import '../../../styles/vars.css';
import './TeacherHome.css';

const {Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children, link) {
    return {
        key, icon, children, label: link ? <Link to={link}>{label}</Link> : label,
    };
}

const items = [getItem('Trang chủ', '1', null, null, '/teacher/home'), getItem('Danh Sách', 'sub1',
    <ViewListIcon/>, [getItem('Lớp học', '2', null, null, '/teacher/class-list'), getItem('Học sinh', '3', null, null, '/teacher/student-list'), getItem('Bài kiểm tra', '4', null, null, '/teacher/test-list'),]), getItem('Cài đặt', 'sub2',
    <SettingsIcon/>, [getItem('Thông tin cá nhân', '5', null, null, '/teacher/update-info'),]),];

const TeacherHome = () => {
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
                    margin: '0 16px', display: 'flex',                // Flexbox display for centering
                    justifyContent: 'center',       // Centers horizontally
                    height: '100vh',                // Full viewport height
                    background: colorBgContainer, borderRadius: borderRadiusLG,
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

export default TeacherHome;
