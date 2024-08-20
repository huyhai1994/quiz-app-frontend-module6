import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Typography} from '@mui/material';
import StudentService from '../../services/student.service';
import {message} from "antd";
import WaitingPana from '../../asset/Waiting-pana.svg'; // Make sure the path to the SVG file is correct

const TeacherApprovalStatus = () => {
    const [approvalStatus, setApprovalStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApprovalStatus = async () => {
            try {
                const response = await StudentService.getTeacherApprovalStatus();
                setApprovalStatus(response.data);
            } catch (error) {
                message.error('Failed to fetch teacher approval status');
            }
        };

        fetchApprovalStatus();
    }, []);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            await StudentService.upgradeStudent();
            message.success('Upgrade request sent successfully!');
            const response = await StudentService.getTeacherApprovalStatus();
            setApprovalStatus(response.data);
        } catch (error) {
            message.error('Failed to send upgrade request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{mt: 5}}>
            <Card sx={{p: 3, maxWidth: 500, width: '100%', boxShadow: 3}}>
                <Typography variant="h5" component="div" gutterBottom>
                    Trạng thái nâng hạng người dùng
                </Typography>
                {approvalStatus ? (
                    <Box textAlign="center">
                        {approvalStatus.status === 'PENDING' ? (
                            <Box>
                                <img src={WaitingPana} alt="Waiting"
                                     style={{width: '100%', maxHeight: '200px', marginBottom: '20px'}}/>
                                <Typography variant="body1" color="textSecondary">
                                    đang chờ duyệt
                                </Typography>
                            </Box>
                        ) : (
                            <Typography>
                                Yêu cầu của bạn {approvalStatus.status}
                            </Typography>
                        )}
                        <Button variant="contained" color="primary" disabled>
                            Nâng hạng lên giáo viên
                        </Button>
                    </Box>
                ) : (
                    <Box textAlign="center">
                        <Typography>Bạn đang là học sinh</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpgrade}
                            disabled={loading}
                        >
                            Nâng hạng lên giáo viên
                        </Button>
                    </Box>
                )}
            </Card>
        </Box>
    );
};

export default TeacherApprovalStatus;
