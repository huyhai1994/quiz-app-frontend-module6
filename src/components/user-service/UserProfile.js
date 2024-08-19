import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, CircularProgress, TextField, Typography} from '@mui/material';
import {PhotoCamera} from '@mui/icons-material';
import axiosInstance from '../../utils/axiosConfig';
import '../../styles/vars.css';
import {toast} from "react-toastify";

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

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress/></Box>;

    }

    if (!user) {
        return <Typography>Failed to load user profile</Typography>;
    }

    return (<Box sx={{
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
                <label htmlFor="avatar-upload" style={{position: 'absolute', bottom: 0, right: 'calc(50%-10rem)'}}>
                    <Button component="span" startIcon={<PhotoCamera/>}>
                        Đăng ảnh đai diện
                    </Button>
                </label>)}
        </Box>
        <TextField
            label="Tên người dùng "
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
            label="Vai trò người dùng "
            fullWidth
            margin="normal"
            value={user.role ? user.role.name : 'Unknown'}
            InputProps={{readOnly: true}}
        />
        <TextField
            label="Register at"
            fullWidth
            margin="normal"
            value={new Date(user.registeredAt).toLocaleString()}
            InputProps={{readOnly: true}}
        />
        {!editMode ? (<Button
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
        </Button>) : (<Box sx={{display: "flex", justifyContent: 'space-between', mt: 2}}>
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{width: '48%'}}>
                Lưu thay đổi
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancelEdit} sx={{width: '48%'}}>
                Hủy
            </Button>
        </Box>)}
    </Box>);
};

export default UserProfile;
