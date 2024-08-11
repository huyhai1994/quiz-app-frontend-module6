import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {PhotoCamera, Visibility, VisibilityOff} from '@mui/icons-material';
import './AdminEdit.css';
import AdminService from "../../../services/admin.service";
import Swal from "sweetalert2";
import '../../../styles/vars.css';

const AdminEdit = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Cần điền tên '),
        email: Yup.string().email('Invalid email').required('Cần điền email '),
        currentPassword: Yup.string().required('Cần điền mật khẩu cũ '),
        newPassword: Yup.string().required('Cần điền mật khẩu mới '),
    });

    const formEditAdmin = useFormik({
        initialValues: {
            id: '', name: '', email: '', currentPassword: '', newPassword: '', avatar: null
        }, validationSchema: validationSchema, onSubmit: (values) => {
            AdminService.updateAdmin(values)
                .then(() => {
                    Swal.fire('Thay đổi thông tin', 'Tài khoản cập nhật thành công', 'success');
                })
                .catch(err => {
                    Swal.fire('Error', err.message, 'error');
                });
        }
    });

    useEffect(() => {
        AdminService.findAdmin()
            .then(response => {
                const {id, name, email, avatar} = response.data;
                formEditAdmin.setValues({
                    id: id, name: name, email: email, currentPassword: '', newPassword: '', avatar: avatar
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
                name="currentPassword"
                label="Mật khẩu cũ"
                type={showCurrentPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={formEditAdmin.values.currentPassword}
                onChange={formEditAdmin.handleChange}
                error={formEditAdmin.touched.currentPassword && Boolean(formEditAdmin.errors.currentPassword)}
                helperText={formEditAdmin.touched.currentPassword && formEditAdmin.errors.currentPassword}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                edge="end"
                            >
                                {showCurrentPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                name="newPassword"
                label="Mật khẩu mới"
                type={showNewPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={formEditAdmin.values.newPassword}
                onChange={formEditAdmin.handleChange}
                error={formEditAdmin.touched.newPassword && Boolean(formEditAdmin.errors.newPassword)}
                helperText={formEditAdmin.touched.newPassword && formEditAdmin.errors.newPassword}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                edge="end"
                            >
                                {showNewPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
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
