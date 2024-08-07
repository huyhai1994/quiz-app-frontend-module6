import React from 'react';
import {Link} from "react-router-dom";
import './Register.css';

const Register = () => {
    return (<div className="container mt-3 col-lg-6">
        <form action="" className=' p-5 register-form '>
            <div className="form-group mb-3">
                <h2 className="text-center">Đăng kí</h2>
                <label htmlFor="fullname">Tên đầy đủ *</label>
                <input type="text" id="fullname" name="fullname" className="form-control" required/>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" className="form-control" required/>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password">Mật khẩu *</label>
                <input type="password" id="password" name="password" className="form-control" required/>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="confirm-password">Nhập lại mật khẩu *</label>
                <input type="password" id="confirm-password" name="confirm-password" className="form-control" required/>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="role">Role</label>
                <select id="role" name="role" className="form-select">
                    <option value="giaovien">Giáo viên</option>
                    <option value="sinhvien">Sinh viên</option>
                </select>
            </div>
            <div className="form-group">
                <button type="submit" className="btn  w-100 register-submit-button">Đăng ký</button>
            </div>
            <div className="form-group">
                <Link className="text-center" to={"/login"}>Đã có tài khoản? Đăng nhập.</Link>
            </div>


        </form>

    </div>);
};

export default Register;
