import React from 'react';
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Box, Button, TextField, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().required('Password Required'),
})

const LoginForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', values);
            localStorage.setItem('token', response.data);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/navigate')
        } catch (error) {
            setErrors({submit: error.response.data});
        } finally {
            setSubmitting(false);
        }
    }

    return (<Box sx={{maxWidth: 400, margin: 'Auto', mt: 4}}>
        <Typography variant="h4" component="h1" gutterBottom>
            Login
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
                    disabled={isSubmitting}
                    sx={{mt: 2}}
                >
                    Login
                </Button>
                {errors.submit && (<Typography color="error" variant="body2" sx={{mt: 2}}>
                    {errors.submit}
                </Typography>)}
            </Form>)}
        </Formik>
    </Box>)
}

export default LoginForm
