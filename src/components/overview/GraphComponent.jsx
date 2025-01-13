import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line, Cell } from 'recharts';
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

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const extractNumber = (str) => {
                const match = str.match(/-?\d+/);
                return match ? parseInt(match[0], 10) : null;
            };

            const currentTemp = extractNumber(data.CurrentTemperature);
            const lowTempLimit = extractNumber(data.LowTemperatureLimit);
            const highTempLimit = extractNumber(data.HighTemperatureLimit);

            const isWithinLimits = (value, lowLimit, highLimit) => {
                if (lowLimit === null || highLimit === null) return true;
                return value >= lowLimit && value <= highLimit;
            };

            const allWithinLimits = isWithinLimits(currentTemp, lowTempLimit, highTempLimit) &&
                                    isWithinLimits(data.CurrentDampness, data.LowDampnessLimit, data.HighDampnessLimit) &&
                                    isWithinLimits(data.CurrentLight, data.LowLightLimit, data.HighLightLimit);

            return (
                <div className="custom-tooltip" style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#fff' }}>
                    <p className="label" style={{ color: allWithinLimits ? 'green' : 'red' }}><strong>{`Seed ID: ${label}`}</strong></p>
                    <p style={{ color: isWithinLimits(currentTemp, lowTempLimit, highTempLimit) ? 'green' : 'red' }}><strong>{`Current Temperature: ${data.CurrentTemperature}`}</strong></p>
                    <p style={{ color: isWithinLimits(data.CurrentDampness, data.LowDampnessLimit, data.HighDampnessLimit) ? 'green' : 'red' }}><strong>{`Current Dampness: ${data.CurrentDampness}`}</strong></p>
                    <p style={{ color: isWithinLimits(data.CurrentLight, data.LowLightLimit, data.HighLightLimit) ? 'green' : 'red' }}><strong>{`Current Light: ${data.CurrentLight}`}</strong></p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="graph-component">
            <Dropdown
                placeholder="Select Seed"
                fluid
                selection
                options={seedOptions}
                onChange={(event, { value }) => setSelectedSeed(value)}
                className="dropdown"
                style={{ margin: '0 auto' }}
            />
            <div className="chart-container">
                <BarChart
                    width={800}
                    height={400}
                    data={filteredData}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="SeedID" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="CurrentTemperature" fill="#8884d8">
                        {filteredData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={generateBarColor(entry.CurrentTemperature, entry.LowTemperatureLimit, entry.HighTemperatureLimit)} />
                        ))}
                    </Bar>
                    <Bar dataKey="CurrentDampness" fill="#82ca9d">
                        {filteredData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={generateBarColor(entry.CurrentDampness, entry.LowDampnessLimit, entry.HighDampnessLimit)} />
                        ))}
                    </Bar>
                    <Bar dataKey="CurrentLight" fill="#ffc658">
                        {filteredData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={generateBarColor(entry.CurrentLight, entry.LowLightLimit, entry.HighLightLimit)} />
                        ))}
                    </Bar>
                    <Line type="monotone" dataKey="HighTemperatureLimit" stroke="red" />
                    <Line type="monotone" dataKey="LowTemperatureLimit" stroke="blue" />
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