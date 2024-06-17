import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { parseCSV } from '../../utils/csvParser';
import { parse, isValid } from 'date-fns';
import './Dashboard.css';

const TotalVolume = () => {
    const [volumeData, setVolumeData] = useState({ datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.csv');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const text = await response.text();
                const parsedData = await parseCSV(text);

                
                console.log('Parsed Data:', parsedData);

                const volumeData = parsedData
                    .filter(item => item.Timestamp && item['Total Volume (km)'])
                    .map(item => ({
                        date: parse(item.Timestamp, 'dd/MM/yyyy HH:mm:ss', new Date()),
                        volume: parseFloat(item['Total Volume (km)']) || 0,
                    }))
                    .filter(item => isValid(item.date) && !isNaN(item.volume));

                
                console.log('Volume Data:', volumeData);

                const data = {
                    labels: volumeData.map(item => item.date),
                    datasets: [{
                        label: 'Total Volume (km)',
                        data: volumeData.map(item => item.volume),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }]
                };

                setVolumeData(data);
            } catch (error) {
                console.error('Error fetching and parsing data:', error);
            }
        };

        fetchData();
    }, []);

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MM/dd/yyyy',
                    },
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    maxTicksLimit: 11,
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Volume (km)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <div className="chart">
                <Line data={volumeData} options={options} />
            </div>
        </div>
    );
};

export default TotalVolume;
