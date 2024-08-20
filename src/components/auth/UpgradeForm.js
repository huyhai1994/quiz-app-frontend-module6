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
            <Col xs={24} sm={16} md={12} lg={8}>
                <Card title="Teacher Approval Status" bordered={false}>
                    {approvalStatus ? (<div>
                            <p>ID: {approvalStatus.id}</p>
                            <p>User ID: {approvalStatus.userId}</p>
                            <p>Status: {approvalStatus.status}</p>
                            {/* Render other possible fields here */}
                            {approvalStatus.status === 'Pending' ? (
                                <Button type="primary" onClick={handleUpgrade} disabled={loading}>
                                    Upgrade to Teacher
                                </Button>) : (<p>Your request is {approvalStatus.status}</p>)}
                        </div>) : (<p>Bạn đang là học sinh</p>)}
                </Card>
            </Col>
        </Row>);
};

export default TeacherApprovalStatus;
