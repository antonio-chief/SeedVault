import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react';

const StorageCard = () => {
    const [totals, setTotals] = useState(null);
    const [storageFacilities, setStorageFacilities] = useState(null);

    useEffect(() => {
        fetchTotals();
        fetchStorageFacilities();
    }, []);

    const fetchTotals = async () => {
        try {
            const response = await axios.get('http://localhost:8001/totals/');
            setTotals(response.data[0]);
        } catch (error) {
            console.error('Error fetching totals:', error);
        }
    };

    const fetchStorageFacilities = async () => {
        try {
            const response = await axios.get('http://localhost:8001/storagefacilities/');
            setStorageFacilities(response.data[0]);
        } catch (error) {
            console.error('Error fetching storage facilities:', error);
        }
    };

    if (!totals || !storageFacilities) return <div>Loading...</div>;

    return (
        <Card>
            <Card.Content>
                <Card.Header>Storage</Card.Header>
                <Card.Description>
                    <div>Total Seeds Stored: {totals.in_inventory}</div>
                    <div>Storage Facilities: {storageFacilities.used} used, {storageFacilities.free} free</div>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default StorageCard;
