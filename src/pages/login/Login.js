import React from 'react';

const Login = () => {
    return (<div className="container mt-5 col-lg-6 ">
        <form className='border shadow p-5'>
            <h2 className="text-center">Login</h2>
            <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" required/>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" required/>
            </div>
            <div className="form-group mb-3">
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </div>
        </form>
    </div>);
};

export default Login;
