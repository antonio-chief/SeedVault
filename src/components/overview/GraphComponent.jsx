import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts'; // Import Cell
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
        ...data.map(item => ({ key: item.SeedID, value: item.SeedID, text: item.SeedID }))
    ];

    return (
        <div className="graph-component">
            <Dropdown
                placeholder="Select Seed"
                fluid
                selection
                options={seedOptions}
                onChange={(e, { value }) => setSelectedSeed(value)}
                className="dropdown"
            />
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
                <Bar
                    dataKey="CurrentTemperature"
                    name="Current Temperature"
                    fill="#8884d8"
                >
                    {filteredData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={
                                entry.CurrentTemperature < entry.LowTemperatureLimit || 
                                entry.CurrentTemperature > entry.HighTemperatureLimit 
                                ? 'red' 
                                : '#8884d8'
                            }
                        />
                    ))}
                </Bar>
                <Bar
                    dataKey="OptimalTemperature"
                    name="Optimal Temperature"
                    fill="green"
                />
            </BarChart>
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
