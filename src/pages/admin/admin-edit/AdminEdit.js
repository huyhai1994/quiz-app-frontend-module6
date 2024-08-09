import React, {useEffect} from 'react';
import {Avatar, Box, Button, IconButton, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {PhotoCamera} from '@mui/icons-material';
import './AdminEdit.css';
import AdminService from "../../../services/admin.service";
import Swal from "sweetalert2";

const AdminEdit = () => {
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string().required('New password is required'),
        avatar: Yup.mixed().required('Avatar is required')
    });

    const formEditAdmin = useFormik({
        initialValues: {
            username: '',
            email: '',
            oldPassword: '',
            newPassword: '',
            avatar: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            AdminService.updateAdmin(values)
                .then(r => {
                    console.log(values);
                    Swal.fire('Success', ' updated successfully', 'success');
                })
                .catch(err => {
                    Swal.fire('Error', err.message, 'error');
                });
        }
    });

    useEffect(() => {
        AdminService.findAdmin()
            .then(response => {
                const {username, email, avatar} = response.data;
                formEditAdmin.setValues({
                    username: username,
                    email: email,
                    oldPassword: '',
                    newPassword: '',
                    avatar: avatar
                });
            })
            .catch(error => {
                console.error('Error fetching admin data:', error);
            });
    }, []);

    return (
        <Box sx={{maxWidth: 600, margin: 'auto', mt: 4}}>
            <form onSubmit={formEditAdmin.handleSubmit}>
                <Box sx={{display: 'flex', justifyContent: 'center', mb: 2}}>
                    <Avatar
                        src={formEditAdmin.values.avatar ? URL.createObjectURL(formEditAdmin.values.avatar) : '/default-avatar.png'}
                        sx={{width: 100, height: 100}}
                    />
                    <input
                        accept="image/*"
                        type="file"
                        style={{display: 'none'}}
                        id="avatar-upload"
                        onChange={(event) => {
                            formEditAdmin.setFieldValue("avatar", event.currentTarget.files[0]);
                        }}
                    />
                </Box>
                <label htmlFor="avatar-upload">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera/>
                    </IconButton>
                    {formEditAdmin.errors.avatar &&
                        <Typography color="error">{formEditAdmin.errors.avatar}</Typography>}
                </label>
                <TextField
                    name="username"
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={formEditAdmin.values.username}
                    onChange={formEditAdmin.handleChange}
                    error={formEditAdmin.touched.username && Boolean(formEditAdmin.errors.username)}
                    helperText={formEditAdmin.touched.username && formEditAdmin.errors.username}
                />
                <TextField
                    name="email"
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={formEditAdmin.values.email}
                    onChange={formEditAdmin.handleChange}
                    error={formEditAdmin.touched.email && Boolean(formEditAdmin.errors.email)}
                    helperText={formEditAdmin.touched.email && formEditAdmin.errors.email}
                />
                <TextField
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={formEditAdmin.values.oldPassword}
                    onChange={formEditAdmin.handleChange}
                    error={formEditAdmin.touched.oldPassword && Boolean(formEditAdmin.errors.oldPassword)}
                    helperText={formEditAdmin.touched.oldPassword && formEditAdmin.errors.oldPassword}
                />
                <TextField
                    name="newPassword"
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={formEditAdmin.values.newPassword}
                    onChange={formEditAdmin.handleChange}
                    error={formEditAdmin.touched.newPassword && Boolean(formEditAdmin.errors.newPassword)}
                    helperText={formEditAdmin.touched.newPassword && formEditAdmin.errors.newPassword}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{mt: 2}}
                >
                    Save Changes
                </Button>
            </form>
        </Box>
    );
};

export default AdminEdit;
