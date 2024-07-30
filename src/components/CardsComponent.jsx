import React from 'react';
import { Card } from 'semantic-ui-react';
import MonitoringCard from './MonitoringCard';
import SecurityCard from './SecurityCard';
import StorageCard from './StorageCard';

const CardsComponent = () => {
    return (
        <Card.Group>
            <MonitoringCard />
            <SecurityCard />
            <StorageCard />
        </Card.Group>
    );
};

export default CardsComponent;
