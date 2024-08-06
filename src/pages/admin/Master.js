import React, {useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {DesktopOutlined, PieChartOutlined, UserOutlined} from '@ant-design/icons';
import Header from '../../components/header/Header';

const {Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children, link) {
    return {
        key,
        icon,
        children,
        label: link ? <Link to={link}>{label}</Link> : label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('Danh Sách', 'sub1', <UserOutlined/>, [
        getItem('Giáo viên', '3', null, null, '/admin/teacher-list'), // Link TeacherList component
        getItem('Chờ duyệt', '4', null, null, '/admin/pending-list'), // Link PendingQuestions component
        getItem('Danh Mục Câu Hỏi ', '5'),
    ]),
];

const Master = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
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
        </Layout>
    );
};

export default Master;
