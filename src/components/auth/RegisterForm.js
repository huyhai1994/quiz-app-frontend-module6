import React from 'react';
import * as Yup from 'yup';
import {TextField, Button, Typography, Box} from '@mui/material'
// import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Formik, Form, Field} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {login, register} from '../../features/authSlice'

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().min(6, 'Too short').required('Password is required'),
    // avatar: Yup.mixed().notRequired()
    avatar: Yup.mixed().nullable().test(
        'fileType',
        'Unsupported File Format',
        value => !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
    )
})

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.auth);

    const handleSubmit = async (values, { setSubmitting, setErrors}) => {
        console.log('Submitting registration with values:', values);

        try {
            await dispatch(register(values)).unwrap();
            navigate('/login');
        } catch (error) {
            // Error is handled by the Redux slice
            setErrors({ general: 'Registration failed' });
        } finally {
            setSubmitting(false);
        }
    }

    //     try {
    //         const resultAction = await dispatch(register(values));
    //         if (register.fulfilled.match(resultAction)) {
    //             navigate('/login');
    //         } else {
    //             setErrors({ general: resultAction.error.message });
    //         }
    //     } catch (error) {
    //         console.error('Registration error:', error);
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };

    return (
        <Box sx={{maxWidth: 400, margin: 'Auto', mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            <Formik
                initialValues={{name: '' ,email: '', password: '', avatar: null}}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
            >
                {({errors, touched, isSubmitting, setFieldValue}) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="name"
                            label="Name"
                            fullWidth
                            margin="normal"
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />
                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            margin="normal"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
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
                            disabled={isSubmitting || loading}
                            sx={{mt: 2}}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                        {/*{error && (*/}
                        {/*    // <Typography color="error" variant="body2" sx={{mt: 2}}>*/}
                        {/*    //     {typeof error === 'string' ? error : JSON.stringify(error, null, 2)}*/}
                        {/*    // </Typography>*/}
                        {/*)}*/}
                        {/*{errors.general && (*/}
                        {/*    <Typography color="error" variant="body2" sx={{mt: 2}}>*/}
                        {/*        {errors.general}*/}
                        {/*    </Typography>*/}
                        {/*)}*/}
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default RegisterForm