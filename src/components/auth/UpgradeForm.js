import React, {useEffect, useState} from 'react';
import {Button, Card, Col, message, Row} from 'antd';
import StudentService from '../../services/student.service';

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
            // Optionally, re-fetch the approval status after upgrading
            const response = await StudentService.getTeacherApprovalStatus();
            setApprovalStatus(response.data);
        } catch (error) {
            message.error('Failed to send upgrade request');
        } finally {
            setLoading(false);
        }
    };

    return (<Row justify="center" style={{marginTop: '50px'}}>
        <Col xs={24} sm={16} md={12} lg={12}>
            <Card className='shadow fw-bold' title="Trạng thái nâng hạng người dùng" bordered={false}>
                {approvalStatus ? (<div>
                    <p>ID: {approvalStatus.id}</p>
                    <p>Status: {approvalStatus.status}</p>
                    {/* Render other possible fields here */}
                    {approvalStatus.status === 'PENDING' ? (<Button type="primary" disabled>
                        Đang duyệt
                    </Button>) : (<p>Yêu cầu của bạn {approvalStatus.status}?"đang chờ"</p>)}
                </div>) : (<div>
                    <p>Bạn đang là học sinh</p>
                    <Button type="primary" onClick={handleUpgrade} disabled={loading}>
                        Nâng hạng lên giáo viên
                    </Button>
                </div>)}
            </Card>
        </Col>
    </Row>);
};

export default TeacherApprovalStatus;
