import React from 'react';
import * as Yup from 'yup';
import {Box, Button, TextField, Typography} from '@mui/material'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik'

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().min(6, 'Too short').required('Password is required'),
    avatar: Yup.mixed().notRequired()
})

const RegisterForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('password', values.password)
        // formData.append('avatar', values.avatar)

        if (values.avatar) {
            formData.append('avatar', values.avatar)
        }
        try {
            await axios.post('http://localhost:8080/api/auth/register', formData, {
                // headers: {'Content-Type': 'multipart/form-data'}
                headers: {'Content-Type': 'application/json'}
            })
            navigate('/login')
        } catch (error) {
            // console.log(error.response.data)
            setErrors({submit: error.response.data.message});
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Box sx={{maxWidth: 400, margin: 'Auto', mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            <Formik
                initialValues={{username: '', email: '', password: '', avatar: null}}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
            >
                {({errors, touched, isSubmitting, setFieldValue}) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="name"
                            label="name"
                            fullWidth
                            margin="normal"
                            errors={touched.name && errors.name}
                            helperText={touched.name && errors.name}
                        />
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
                            helperText={touched.passord && errors.password}
                        />
                        <input
                            accept="image/*"
                            type="file"
                            onChange={(event) => {
                                setFieldValue("avatar", event.currentTarget.files[0]);
                            }}
                        />
                        {errors.avatar && <Typography color="error">{errors.avatar}</Typography>}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                            sx={{mt: 2}}
                        >
                            Register
                        </Button>
                        {errors.submit && (
                            <Typography color="error" variant="body2" sx={{mt: 2}}>
                                {errors.submit}
                            </Typography>
                        )}
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default RegisterForm
