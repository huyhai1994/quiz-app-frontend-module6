import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (<div className="container mt-5">
        <h1 className="text-center">Welcome to the Home Page</h1>
        <div className="text-center">
            <Link to="/login" className="btn btn-success mx-2 p-2 w-25">Login</Link>
            <Link to="/register" className="btn btn-primary mx-2 p-2 w-25">Register</Link>
        </div>
    </div>);
};

export default Home;
