import React, {useState} from 'react';
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {Box, Button, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login} from '../../features/authSlice';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import './LoginForm.css';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Cần điền địa chỉ email'),
    password: Yup.string().required('Cần điền mật khẩu'),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        try {
            await dispatch(login(values)).unwrap();
            const role = localStorage.getItem('role');
            switch (role) {
                case 'ROLE_ADMIN':
                    navigate('/admin');
                    break;
                case 'ROLE_TEACHER':
                    navigate('/teacher');
                    break;
                case 'ROLE_STUDENT':
                    navigate('/student/home');
                    break;
                default:
                    navigate('/');
            }
        } catch (error) {
            // Error is handled by the Redux slice
            setErrors({general: 'Login failed'});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{maxWidth: 400, margin: 'auto', mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom className='text-center'>
                Đăng nhập
            </Typography>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({errors, touched, isSubmitting}) => (<Form>
                        <Field
                            as={TextField}
                            name="email"
                            label="địa chỉ email "
                            fullWidth
                            margin="normal"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <Field
                            as={TextField}
                            name="password"
                            label="Mật khẩu"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: (<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className='submit-button'
                            disabled={isSubmitting || loading}
                            sx={{mt: 2}}
                        >
                            {loading ? 'Logging in...' : 'Đăng nhập'}
                        </Button>
                        {error && (
                            <Typography color="error" variant="body2" sx={{mt: 2}}>
                                {typeof error === 'string' ? error : JSON.stringify(error, null, 2)}
                            </Typography>)}
                        {errors.general && (
                            <Typography color="error" variant="body2" sx={{mt: 2}}>
                                {errors.general}
                            </Typography>
                        )}
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default LoginForm;
