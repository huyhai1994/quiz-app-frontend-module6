import {Card, Avatar, Typography, Spin} from 'antd'
import axiosInstance from '../utils/axiosConfig'
import {useEffect, useState} from "react";

const {Title, Text} = Typography

const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get('/users/profile')
                setUser(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setLoading(false)
            }
        }
        fetchUserProfile()
    }, [])

    if (loading) {
        return <Spin size="large" />
    }

    if (!user) {
        return <Text>Failed to load user profile</Text>;
    }

    return (
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
            <Avatar size={64} src={user.avatar} />
            <Title level={2}>{user.name}</Title>
            <Text strong>Email:</Text> <Text>{user.email}</Text>
            <br />
            <Text strong>Role:</Text> <Text>{user.role ? user.role.name : 'Unknown'}</Text>
            <br />
            <Text strong>Registered at:</Text> <Text>{new Date(user.registeredAt).toLocaleString()}</Text>
        </Card>
    )
}

export default UserProfile
