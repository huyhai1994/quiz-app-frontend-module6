import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, CircularProgress, TextField, Typography} from '@mui/material';
import {PhotoCamera} from '@mui/icons-material';
import axiosInstance from '../../utils/axiosConfig';
import '../../styles/vars.css';
import {toast} from "react-toastify";
import moment from 'moment';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get('/users/profile');
                setUser(response.data);
                setName(response.data.name);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setName(user.name);
        setAvatar(null);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAvatarChange = (event) => {
        setAvatar(event.target.files[0]);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            if (avatar) {
                formData.append('avatar', avatar);
            }
            const response = await axiosInstance.put(`/users/profile`, formData, {
                headers: {
                    'Content-Type': 'application/json', // 'Content-Type': 'multipart/form-data'
                },
            });
            setUser(response.data);
            setEditMode(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile: ', error);
            toast.error('Failed to update profile');
        }
    };

    const formatDate = (date) => {
        if (!date) return 'N/A'; // Return 'N/A' if date is null or undefined

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };

        try {
            return new Intl.DateTimeFormat('vi-VN', options).format(new Date(date));
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    const formatLastLogin = (lastLogin) => {
        if (!lastLogin) return 'Chưa đăng nhập lần nào';
        return `Lần đăng nhập gần nhất: ${moment(lastLogin).format('DD/MM/YYYY HH:mm:ss')}`;
    };

    const getRoleName = (role) => {
        switch (role) {
            case "ROLE_STUDENT":
                return "Học sinh";
            case "ROLE_TEACHER":
                return "Giáo viên";
            case "ROLE_ADMIN":
                return "Quản trị viên";
            default:
                return "Unknown";
        }
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress/></Box>;
    }

    if (!user) {
        return <Typography>Failed to load user profile</Typography>;
    }

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
            <Box sx={{display: 'flex', justifyContent: 'center', mb: 2, position: 'relative'}}>
                <Avatar
                    src={user.avatar || '/default-avatar.png'}
                    sx={{width: 100, height: 100}}
                />
                {editMode && (<input
                    accept="image/*"
                    type="file"
                    style={{display: 'none'}}
                    id="avatar-upload"
                    onChange={handleAvatarChange}
                />)}
                {editMode && (
                    <label htmlFor="avatar-upload"
                           style={{position: 'absolute', bottom: 0, right: 'calc(50% - 10rem)'}}>
                        <Button component="span" startIcon={<PhotoCamera/>}>
                            Đăng ảnh đai diện
                        </Button>
                    </label>)}
            </Box>
            <TextField
                label="Tên người dùng"
                fullWidth
                margin="normal"
                value={editMode ? name : user.name}
                onChange={handleNameChange}
                InputProps={{readOnly: !editMode}}
            />
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={user.email}
                InputProps={{readOnly: true}}
            />
            <TextField
                label="Vai trò người dùng"
                fullWidth
                margin="normal"
                value={getRoleName(user.role ? user.role.name : 'Unknown')}
                InputProps={{readOnly: true}}
                disabled
            />
            <TextField
                label="Đăng kí tài khoản vào "
                fullWidth
                margin="normal"
                value={formatDate(user.registeredAt)}
                InputProps={{readOnly: true}}
                disabled
            />
            <TextField
                label="Thời gian đăng nhập gần nhất"
                fullWidth
                margin="normal"
                value={formatLastLogin(user.lastLogin)}
                InputProps={{readOnly: true}}
                disabled
            />
            {!editMode ? (
                <Button
                    variant="contained"
                    onClick={handleEditClick}
                    sx={{
                        mt: 2,
                        backgroundColor: 'var(--color-primary)',
                        '&:hover': {backgroundColor: 'var(--color-secondary)', color: 'var(--color-text)'},
                        width: '100%'  // Make button full width
                    }}
                >
                    Ấn để sửa
                </Button>
            ) : (
                <Box sx={{
                    display: "flex",
                    justifyContent: 'space-between',
                    mt: 2,
                    flexDirection: {xs: 'column', sm: 'row'} // Column on small screens, row on larger
                }}>
                    <Button
                        variant="contained"
                        sx={{
                            width: {xs: '100%', sm: '48%'}, // Full width on small screens, 48% on larger
                            mb: {xs: 2, sm: 0}, // Add margin bottom on small screens
                            backgroundColor: 'var(--color-primary)', // Use custom primary color
                            '&:hover': {backgroundColor: 'var(--color-primary-dark)'} // Add hover effect
                        }}
                        onClick={handleSubmit}
                    >
                        Lưu thay đổi
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancelEdit}
                        sx={{
                            width: {xs: '100%', sm: '48%'} // Full width on small screens, 48% on larger
                        }}
                    >
                        Hủy
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default UserProfile;