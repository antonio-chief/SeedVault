import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell, Line } from 'recharts';
import 'semantic-ui-css/semantic.min.css';
import './graphcomponent.css';


const GraphComponent = () => {
    const [data, setData] = useState([]);
    const [selectedSeed, setSelectedSeed] = useState('All Seeds');
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8001/monitoring/');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching seed data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedSeed === 'All Seeds') {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(item => item.SeedID === selectedSeed));
        }
    }, [data, selectedSeed]);

    const seedOptions = [
        { key: 'All Seeds', value: 'All Seeds', text: 'All Seeds' },
        ...data.map(item => ({
            key: item.SeedID,
            value: item.SeedID,
            text: item.SeedName ? `${item.SeedName} (${item.SeedID})` : item.SeedID
        }))
    ];

    const generateBarColor = (value, lowLimit, highLimit) => {
        if (value < lowLimit || value > highLimit) {
            return 'red';
        }
        return '#8884d8';
    };

    const renderBars = (entry) => (
        <>
            <Bar dataKey="CurrentTemperature" fill={generateBarColor(entry.CurrentTemperature, entry.LowTemperatureLimit, entry.HighTemperatureLimit)} />
            <Bar dataKey="CurrentDampness" fill={generateBarColor(entry.CurrentDampness, entry.LowDampnessLimit, entry.HighDampnessLimit)} />
            <Bar dataKey="CurrentLight" fill={generateBarColor(entry.CurrentLight, entry.LowLightLimit, entry.HighLightLimit)} />
        </>
    );

    return (
        <div className="graph-component">
            <Dropdown
                placeholder="Select Seed"
                fluid
                selection
                options={seedOptions}
                onChange={(e, { value }) => setSelectedSeed(value)}
                className="dropdown"
                style={{ margin: '0 auto' }}
            />
            <div className="chart-container">
                <BarChart
                    width={800}
                    height={400}
                    data={filteredData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="SeedID" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {filteredData.map((entry, index) => (
                        <React.Fragment key={`entry-${index}`}>
                            <Line type="monotone" dataKey={() => entry.HighTemperatureLimit} stroke="red" />
                            <Line type="monotone" dataKey={() => entry.LowTemperatureLimit} stroke="blue" />
                            {renderBars(entry)}
                        </React.Fragment>
                    ))}
                </BarChart>
            </div>
            
            <input
                type="range"
                min="0"
                max={data.length - 1}
                step="1"
                onChange={(e) => setSelectedSeed(data[e.target.value].SeedID)}
                className="range-input"
            />
            
        </div>
    );
};

export default GraphComponent;
