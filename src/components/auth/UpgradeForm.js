import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Typography} from '@mui/material';
import StudentService from '../../services/student.service';
import {message} from "antd";
import '../../styles/vars.css';
import WaitingPana from '../../asset/Waiting-pana.svg';
import UpgradePana from '../../asset/Upgrade-pana.svg'; // Ensure the path is correct

const TeacherApprovalStatus = () => {
    const [approvalStatus, setApprovalStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApprovalStatus = async () => {
            try {
                const response = await StudentService.getTeacherApprovalStatus();
                setApprovalStatus(response.data);
            } catch (error) {
                message.success('bạn có thể nâng hạng lên giáo viên');
            }
        };

        fetchApprovalStatus();
    }, [loading]);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            await StudentService.upgradeStudent();
            message.success('Yêu cầu nâng hạng đã được gửi đi!');
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
                <Typography variant="h5" component="div" gutterBottom className='text-center fw-bold'>
                    Trạng thái nâng hạng người dùng
                </Typography>
                {approvalStatus ? (
                    <Box textAlign="center">
                        {approvalStatus.status === 'PENDING' ? (
                            <Box>
                                <img src={WaitingPana} alt="Waiting"
                                     style={{width: '100%', maxHeight: '200px', marginBottom: '20px'}}/>
                                <Typography variant="h6" color="textSecondary">
                                    đang chờ duyệt
                                </Typography>
                            </Box>
                        ) : (
                            <Typography>
                                Yêu cầu của bạn {approvalStatus.status}
                            </Typography>
                        )}
                        <Button variant="contained" disabled
                        >
                            Nâng hạng lên giáo viên
                        </Button>
                    </Box>
                ) : (
                    <Box textAlign="center">
                        <img src={UpgradePana} alt="Upgrade"
                             style={{width: '100%', maxHeight: '200px', marginBottom: '20px'}}/>
                        <Button
                            variant="contained"
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
