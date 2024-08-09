import React from 'react';
import HomeMain from "./HomeMain";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import {Menu} from "antd";
import {Link} from "react-router-dom";

const Home = () => {
    return (<>
        <HomeHeader>
        <Menu theme="dark" mode="horizonl"  defaultSelectedKeys={['1']}>
            <Menu.Item key = "1">Home</Menu.Item>
            <Menu.Item key="2"><Link to="/profile">Your Profile</Link></Menu.Item>
        </Menu>
        </HomeHeader>
        <HomeMain/>
        <HomeFooter/>
    </>);
};

export default Home;
