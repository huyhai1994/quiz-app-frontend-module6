import React, {useEffect, useState} from 'react';
import {Button, Card, Col, message, Row} from 'antd';
import StudentService from '../../services/student.service';

const UpgradeForm = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        // Fetch the approval status when the component mounts
        const fetchStatus = async () => {
            try {
                const response = await StudentService.getStudentUpgradeStatus();
                setStatus(response.data.status);
            } catch (error) {
                message.error('Failed to fetch approval status');
            }
        };

        fetchStatus();
    }, []);

    const handleUpgradeRequest = async () => {
        setLoading(true);
        try {
            await StudentService.upgradeStudent();
            message.success('Upgrade request submitted successfully');
            setStatus('pending'); // Assuming the status is set to pending after submission
        } catch (error) {
            message.error('Failed to submit upgrade request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row justify="center" style={{marginTop: '50px'}}>
            <Col xs={24} sm={16} md={12} lg={8}>
                <Card title="Upgrade to Teacher Account" bordered={false}>
                    <Button type="primary" onClick={handleUpgradeRequest} loading={loading}>
                        Submit Request
                    </Button>
                    {status && (
                        <div style={{marginTop: '20px'}}>
                            <strong>Approval Status:</strong> {status}
                        </div>
                    )}
                </Card>
            </Col>
        </Row>
    );
};

export default UpgradeForm;
