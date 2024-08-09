import React from 'react';
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Box, Typography, TextField, Button} from "@mui/material";
import {Formik, Form, Field} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login} from '../../features/authSlice'

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().required('Password Required'),
})

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.auth);

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            await dispatch(login(values)).unwrap();
            navigate('/');
        } catch (error) {
            // Error is handled by the Redux slice
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Box sx={{maxWidth: 400, margin: 'Auto', mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({errors, touched, isSubmitting}) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            margin="normal"
                            error={touched.email && errors.email}
                            helperText={touched.email && errors.email}
                        />
                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            error={touched.password && errors.password}
                            helperText={touched.password && errors.password}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting || loading}
                            sx={{mt: 2}}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                                {typeof error === 'string' ? error : JSON.stringify(error, null, 2)}
                            </Typography>
                        )}
                        {errors.general && (
                            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                                {errors.general}
                            </Typography>
                        )}
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default LoginForm