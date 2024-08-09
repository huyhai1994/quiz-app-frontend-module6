import React, {useEffect} from 'react';
import {Avatar, Box, Button, IconButton, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {PhotoCamera} from '@mui/icons-material';
import './AdminEdit.css';
import AdminService from "../../../services/admin.service";
import Swal from "sweetalert2";
import '../../../styles/vars.css';

const AdminEdit = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Cần điền tên '),
        email: Yup.string().email('Invalid email').required('Cần điền email '),
        oldPassword: Yup.string().required('Cần điền mật khẩu cũ '),
        newPassword: Yup.string().required('Cần điền mật khẩu mới '),
    });

    const formEditAdmin = useFormik({
        initialValues: {
            name: '', email: '', oldPassword: '', newPassword: '', avatar: null
        }, validationSchema: validationSchema, onSubmit: (values) => {
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
                const {name, email, avatar} = response.data;
                formEditAdmin.setValues({
                    name: name, email: email, oldPassword: '', newPassword: '', avatar: avatar
                });
            })
            .catch(error => {
                console.error('Error fetching admin data:', error);
            });
    }, []);

    return (<Box sx={{
        maxWidth: 600,
        margin: 'auto',
        mt: 4,
        border: '1px solid #ccc',
        borderRadius: 4,
        padding: 3,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
        <form onSubmit={formEditAdmin.handleSubmit}>
            <Box sx={{display: 'flex', justifyContent: 'center', mb: 2, position: 'relative'}}>
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
                <label htmlFor="avatar-upload" style={{position: 'absolute', bottom: 0, right: 'calc(50% - 4rem)'}}>
                    <IconButton color="var(--color-primary)" aria-label="upload picture" component="span">
                        <PhotoCamera/>
                    </IconButton>
                    {formEditAdmin.errors.avatar &&
                        <Typography color="error">{formEditAdmin.errors.avatar}</Typography>}
                </label>
            </Box>
            <TextField
                name="name"
                label="Tên"
                fullWidth
                margin="normal"
                value={formEditAdmin.values.name}
                onChange={formEditAdmin.handleChange}
                error={formEditAdmin.touched.name && Boolean(formEditAdmin.errors.name)}
                helperText={formEditAdmin.touched.name && formEditAdmin.errors.name}
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
                label="mật khầu cũ "
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
                label="Mật khẩu mới"
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
                sx={{mt: 2, backgroundColor: 'var(--color-primary)', color: 'white'}}
                fullWidth
            >
                Lưu Thay đổi
            </Button>
        </form>
    </Box>);
};

export default AdminEdit;
