import React, {useEffect, useState} from 'react';
import {Card, Col, message, Row} from 'antd';
import StudentService from '../../services/student.service';

const TeacherApprovalStatus = () => {
    const [approvalStatus, setApprovalStatus] = useState(null);

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

    return (<Row justify="center" style={{marginTop: '50px'}}>
            <Col xs={24} sm={16} md={12} lg={8}>
                <Card title="Teacher Approval Status" bordered={false}>
                    {approvalStatus ? (<div>
                            <p>ID: {approvalStatus.id}</p>
                            <p>User ID: {approvalStatus.userId}</p>
                            <p>Status: {approvalStatus.status}</p>
                            {/* Render other possible fields here */}
                        </div>) : (<p>Loading...</p>)}
                </Card>
            </Col>
        </Row>);
};

export default TeacherApprovalStatus;
