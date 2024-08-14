import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, TextField, Typography} from '@mui/material';
import {PhotoCamera} from '@mui/icons-material';
import axiosInstance from '../../utils/axiosConfig';
import {API_USER_URL} from '../../configs/backend.configs';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get(API_USER_URL + '/profile');
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
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
                <input
                    accept="image/*"
                    type="file"
                    style={{display: 'none'}}
                    id="avatar-upload"
                />
                <label htmlFor="avatar-upload" style={{position: 'absolute', bottom: 0, right: 'calc(50% - 4rem)'}}>
                    <Button component="span" startIcon={<PhotoCamera/>}>
                        Upload
                    </Button>
                </label>
            </Box>
            <TextField
                label="User Name"
                fullWidth
                margin="normal"
                value={user.name}
                InputProps={{readOnly: true}}
            />
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={user.email}
                InputProps={{readOnly: true}}
            />
            <TextField
                label="Role"
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
        </Box>
    );
};

export default UserProfile;
