import React from 'react';
import {Link} from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './Register.css';

// Validation schema
const validationSchema = Yup.object({
    fullname: Yup.string().required('Tên đầy đủ là bắt buộc'),
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Nhập lại mật khẩu là bắt buộc'),
    role: Yup.string().required('Role là bắt buộc'),
});

const Register = () => {
    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'sinhvien',
        },
        validationSchema,
        onSubmit: values => {
            console.log('Form data', values);
            // Handle form submission
        },
    });

    return (
        <div className="container mt-3 col-lg-6">
            <form onSubmit={formik.handleSubmit} className='p-5 register-form'>
                <div className="form-group mb-3">
                    <h2 className="text-center">Đăng kí</h2>
                    <label htmlFor="fullname">Tên đầy đủ *</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullname}
                    />
                    {formik.touched.fullname && formik.errors.fullname ? (
                        <div className="error">{formik.errors.fullname}</div>
                    ) : null}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Mật khẩu *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu *</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="error">{formik.errors.confirmPassword}</div>
                    ) : null}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        className="form-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.role}
                    >
                        <option value="giaovien">Giáo viên</option>
                        <option value="sinhvien">Sinh viên</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                        <div className="error">{formik.errors.role}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn w-100 register-submit-button">Đăng ký</button>
                </div>
                <div className="form-group">
                    <Link className="text-center" to={"/login"}>Đã có tài khoản? Đăng nhập.</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
