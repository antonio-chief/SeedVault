import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon, Card } from 'semantic-ui-react';

const SecurityCard = () => {
    const [securityStatus, setSecurityStatus] = useState(null);

    useEffect(() => {
        fetchSecurityStatus();
    }, []);

    const fetchSecurityStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8001/security-breach/');
            setSecurityStatus(response.data.length > 0 ? 'Insecure' : 'Secure');
        } catch (error) {
            console.error('Error fetching security status:', error);
        }
    };

    if (!securityStatus) return <div>Loading...</div>;

    return (
        <Card>
            <Card.Content>
                <Card.Header>Security</Card.Header>
                <Card.Description>
                    <div>
                        Status: {securityStatus} {securityStatus === 'Insecure' ? <Icon name="warning sign" color="red" /> : <Icon name="check circle" color="green" />}
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default SecurityCard;
