import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon, Card } from 'semantic-ui-react';

const MonitoringCard = () => {
    const [monitoringData, setMonitoringData] = useState(null);

    useEffect(() => {
        fetchMonitoringData();
    }, []);

    const fetchMonitoringData = async () => {
        try {
            const response = await axios.get('http://localhost:8001/monitoring/');
            setMonitoringData(response.data);
        } catch (error) {
            console.error('Error fetching monitoring data:', error);
        }
    };

    const renderStatusIcon = (current, low, high) => {
        return current < low || current > high ? <Icon name="warning sign" color="red" /> : <Icon name="check circle" color="green" />;
    };

    if (!monitoringData) return <div>Loading...</div>;

    const latestData = monitoringData[monitoringData.length - 1];

    return (
        <Card>
            <Card.Content>
                <Card.Header>Monitoring</Card.Header>
                <Card.Description>
                    <div>
                        Temperature: {latestData.CurrentTemperature}°C {renderStatusIcon(parseFloat(latestData.CurrentTemperature), parseFloat(latestData.LowTemperatureLimit), parseFloat(latestData.HighTemperatureLimit))}
                    </div>
                    <div>
                        Dampness: {latestData.CurrentDampness}% {renderStatusIcon(latestData.CurrentDampness, latestData.LowDampnessLimit, latestData.HighDampnessLimit)}
                    </div>
                    <div>
                        Light Intensity: {latestData.CurrentLight} lx {renderStatusIcon(latestData.CurrentLight, latestData.LowLightLimit, latestData.HighLightLimit)}
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default MonitoringCard;
