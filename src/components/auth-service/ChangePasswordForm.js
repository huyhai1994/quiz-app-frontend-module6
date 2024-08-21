import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {changePassword} from '../../features/authSlice';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const ChangePasswordForm = () => {
    const dispatch = useDispatch();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Xin vui lòng nhập mật khẩu hiện tại'),
        newPassword: Yup.string().min(6, 'Mật khẩu phải có tối thiểu 6 số').required('Không được để trống'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Hai mật khẩu không khớp').required('Vui lòng nhập mật khẩu xác nhận'),
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(changePassword(values)).unwrap();
                Swal.fire('Mật khẩu', 'Thay  đổi mật khẩu thành công !', 'success');
                formik.resetForm();
            } catch (error) {
                Swal.fire('Thất bại', error || 'Xin vui lòng kiểm tra lại mật khẩu vừa nhập!', 'error');
            }
        }
    });

    return (
        <Box sx={{
            maxWidth: 600,
            margin: 'auto',
            mt: 4,
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: 3,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="currentPassword">Mật khẩu hiện tại</InputLabel>
                    <OutlinedInput
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={formik.values.currentPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                        label="Current Password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    edge="end"
                                >
                                    {showCurrentPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {formik.touched.currentPassword && formik.errors.currentPassword && (
                        <Typography color="error">{formik.errors.currentPassword}</Typography>
                    )}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="newPassword">Mật khẩu mới </InputLabel>
                    <OutlinedInput
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        label="New Password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    edge="end"
                                >
                                    {showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {formik.touched.newPassword && formik.errors.newPassword && (
                        <Typography color="error">{formik.errors.newPassword}</Typography>
                    )}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="confirmPassword">Xác thực lại mật khẩu mới </InputLabel>
                    <OutlinedInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        label="Confirm New Password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <Typography color="error">{formik.errors.confirmPassword}</Typography>
                    )}
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 2, backgroundColor: 'var(--color-primary)', color: 'white'}}
                    fullWidth
                >
                    Xác nhận
                </Button>
            </form>
        </Box>
    );
};

export default ChangePasswordForm;
