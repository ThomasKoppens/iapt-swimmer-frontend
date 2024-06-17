import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { parseCSV } from '../../utils/csvParser';
import 'chartjs-adapter-date-fns';
import { parse, isValid, isWithinInterval } from 'date-fns';
import TotalVolume from './TotalVolume';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, TimeScale);

const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '400px',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#001f3f', 
        borderRadius: '10px',
        border: '1px solid #ffffff', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        color: '#ffffff', 
    },
};
const inputStyles = {
    width: '80%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const Dashboard = () => {
    const [lineChartData, setLineChartData] = useState({});
    const [combinedChartData, setCombinedChartData] = useState({});
    const [athleteData, setAthleteData] = useState({});
    const [athleteOptions, setAthleteOptions] = useState([]);
    const [selectedAthletes, setSelectedAthletes] = useState([]);
    const [maxOTI, setMaxOTI] = useState(10); 
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [groups, setGroups] = useState({});
    const [groupName, setGroupName] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null); 
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [renameModalIsOpen, setRenameModalIsOpen] = useState(false); 
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false); 
    const [newGroupName, setNewGroupName] = useState(''); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.csv'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const text = await response.text();
                console.log('CSV Text:', text); 
                const parsedData = await parseCSV(text); 
                console.log('Parsed Data:', parsedData); 
    
                
                const groupedData = {};
                let maxOTIValue = 10; 
                parsedData.forEach(item => {
                    const athleteName = item['Athlete\'s Name']?.trim();  
                    const timestamp = item.Timestamp?.trim();
                    const rpeValue = item.RPE != null ? item.RPE.toString().trim() : '';
                    const otiValue = item.OTI != null ? item.OTI.toString().trim() : '';
    
                    console.log('Processing item:', { athleteName, timestamp, rpeValue, otiValue });
    
                    if (athleteName && timestamp && rpeValue) {  
                        const date = parse(timestamp, 'dd/MM/yyyy HH:mm:ss', new Date());
                        const rpe = parseFloat(rpeValue);
                        const oti = parseFloat(otiValue);
    
                        console.log('Parsed values:', { date, rpe, oti });
    
                        if (isValid(date) && !isNaN(rpe)) {  
                            if (!groupedData[athleteName]) {
                                groupedData[athleteName] = { dates: [], rpes: [], otis: [] };
                            }
                            groupedData[athleteName].dates.push(date);
                            groupedData[athleteName].rpes.push(rpe);
                            groupedData[athleteName].otis.push(isNaN(oti) ? 0 : oti); 
                            if (oti > maxOTIValue) {
                                maxOTIValue = oti; 
                            }
                        }
                    }
                });
    
                console.log('Grouped Data:', groupedData); 
    
                setAthleteData(groupedData);
                setMaxOTI(maxOTIValue); 
    
                
                const athleteOptions = [
                    { value: 'select_all', label: 'Select All' },
                    ...Object.keys(groupedData).map(athlete => ({
                        value: athlete,
                        label: athlete,
                    }))
                ];
    
                console.log('Athlete Options:', athleteOptions); 
    
                setAthleteOptions(athleteOptions);
    
                
                const savedGroups = JSON.parse(localStorage.getItem('athleteGroups')) || {};
                setGroups(savedGroups);
            } catch (error) {
                console.error('Error parsing CSV file:', error);
            }
        };
    
        fetchData();
    }, []);
    
    
    
    useEffect(() => {
        console.log('Athlete Data:', athleteData); 
    }, [athleteData]);

    const updateChartData = (data, selectedAthletes, maxOTIValue) => {
        const filterDataByDate = (athleteData) => {
            const filteredData = { dates: [], rpes: [], otis: [] };
            athleteData.dates.forEach((date, index) => {
                if ((!startDate || !endDate) || isWithinInterval(date, { start: startDate, end: endDate })) {
                    filteredData.dates.push(date);
                    filteredData.rpes.push(athleteData.rpes[index]);
                    filteredData.otis.push(athleteData.otis[index]);
                }
            });
            return filteredData;
        };

        const lineDatasets = selectedAthletes.map(athlete => {
            const filteredData = filterDataByDate(data[athlete]);
            return {
                label: athlete,
                data: filteredData.dates.map((date, index) => ({
                    x: date,
                    y: filteredData.rpes[index],
                })),
                fill: false,
                borderColor: getRandomColor(),
                backgroundColor: getRandomColor(0.2),
                pointBorderColor: getRandomColor(),
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'black', 
                pointHoverBorderColor: 'black', 
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            };
        });

        const combinedDatasets = selectedAthletes.reduce((datasets, athlete) => {
            const filteredData = filterDataByDate(data[athlete]);
            datasets.push(
                {
                    type: 'bar',
                    label: `RPE - ${athlete}`,
                    data: filteredData.dates.map((date, index) => ({
                        x: date,
                        y: filteredData.rpes[index],
                    })),
                    backgroundColor: getRandomColor(0.2),
                    borderColor: getRandomColor(),
                    borderWidth: 1,
                },
                {
                    type: 'line',
                    label: `OTI - ${athlete}`,
                    data: filteredData.dates.map((date, index) => ({
                        x: date,
                        y: filteredData.otis[index],
                    })),
                    fill: false,
                    borderColor: getRandomColor(),
                    backgroundColor: getRandomColor(0.2),
                    pointBorderColor: getRandomColor(),
                    pointBackgroundColor: getRandomColor(1),
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'black', 
                    pointHoverBorderColor: 'black', 
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                }
            );
            return datasets;
        }, []);

        setLineChartData({ datasets: lineDatasets });
        setCombinedChartData({ datasets: combinedDatasets });
    };

    const handleAthleteSelection = selectedOptions => {
        const isSelectAll = selectedOptions.some(option => option.value === 'select_all');

        if (isSelectAll) {
            
            const allAthleteOptions = Object.keys(athleteData).map(athlete => ({
                value: athlete,
                label: athlete,
            }));
            setSelectedAthletes(allAthleteOptions.map(option => option.value));
            updateChartData(athleteData, allAthleteOptions.map(option => option.value), maxOTI);
        } else {
            const selectedAthleteNames = selectedOptions.map(option => option.value);
            setSelectedAthletes(selectedAthleteNames);
            updateChartData(athleteData, selectedAthleteNames, maxOTI);
        }
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate) {
            filterData(date, endDate);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (startDate) {
            filterData(startDate, date);
        }
    };

    const filterData = (start, end) => {
        const filteredData = {};
        Object.keys(athleteData).forEach(athlete => {
            filteredData[athlete] = {
                dates: [],
                rpes: [],
                otis: []
            };
            athleteData[athlete].dates.forEach((date, index) => {
                if (isWithinInterval(date, { start, end })) {
                    filteredData[athlete].dates.push(date);
                    filteredData[athlete].rpes.push(athleteData[athlete].rpes[index]);
                    filteredData[athlete].otis.push(athleteData[athlete].otis[index]);
                }
            });
        });
        updateChartData(filteredData, selectedAthletes, maxOTI);
    };

    const getRandomColor = (opacity = 1) => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r},${g},${b},${opacity})`;
    };

    const lineOptions = {
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
                    maxTicksLimit: 10,
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'RPE',
                },
                beginAtZero: true,
                max: 10,
            },
        },
    };

    const combinedOptions = {
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
                    maxTicksLimit: 10,
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value',
                },
                beginAtZero: true,
                max: maxOTI, 
            },
        },
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: 'black', 
            backgroundColor: state.isFocused ? 'lightblue' : 'white', 
            ':active': {
                ...provided[':active'],
                backgroundColor: state.isFocused ? 'lightblue' : 'white',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'lightgrey', 
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'black', 
        }),
    };

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleCreateGroup = () => {
        if (groupName.trim() && selectedAthletes.length > 0) {
            const newGroups = { ...groups, [groupName]: selectedAthletes };
            setGroups(newGroups);
            localStorage.setItem('athleteGroups', JSON.stringify(newGroups));
            setGroupName('');
            closeModal();
        }
    };

    const handleRenameGroup = () => {
        if (newGroupName.trim() && selectedGroup) {
            const updatedGroups = { ...groups };
            updatedGroups[newGroupName] = updatedGroups[selectedGroup];
            delete updatedGroups[selectedGroup];
            setGroups(updatedGroups);
            localStorage.setItem('athleteGroups', JSON.stringify(updatedGroups));
            setSelectedGroup(newGroupName);
            setNewGroupName('');
            closeRenameModal();
        }
    };

    const handleDeleteGroup = () => {
        if (selectedGroup) {
            const updatedGroups = { ...groups };
            delete updatedGroups[selectedGroup];
            setGroups(updatedGroups);
            localStorage.setItem('athleteGroups', JSON.stringify(updatedGroups));
            setSelectedGroup('');
            setSelectedAthletes([]);
            setLineChartData({});
            setCombinedChartData({});
            closeDeleteModal();
        }
    };

    const handleGroupSelection = (selectedOption) => {
        const selectedGroupName = selectedOption ? selectedOption.value : null;
        setSelectedGroup(selectedGroupName);
        if (selectedGroupName && groups[selectedGroupName]) {
            setSelectedAthletes(groups[selectedGroupName]);
            updateChartData(athleteData, groups[selectedGroupName], maxOTI);
        } else {
            setSelectedAthletes([]);
            setLineChartData({});
            setCombinedChartData({});
        }
    };

    const groupOptions = [
        { value: '', label: 'Select Group' }, 
        ...Object.keys(groups).map(group => ({
            value: group,
            label: group,
        }))
    ];

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openRenameModal = () => {
        setRenameModalIsOpen(true);
    };

    const closeRenameModal = () => {
        setRenameModalIsOpen(false);
    };

    const openDeleteModal = () => {
        setDeleteModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
    };

    const handleResetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    updateChartData(athleteData, selectedAthletes, maxOTI); 
};


    return (
        <div className="dashboard-container">
            <div className="chart-container">
                <Tabs>
                    <TabList>
                        <Tab>RPE over Time</Tab>
                        <Tab>OTI vs RPE</Tab>
                        <Tab>Total Volume</Tab>
                    </TabList>

                    <TabPanel>
                        {lineChartData.datasets && lineChartData.datasets.length > 0 ? (
                            <Line data={lineChartData} options={lineOptions} />
                        ) : (
                            <p>No data to display. Please select athletes to view the chart.</p>
                        )}
                    </TabPanel>
                    <TabPanel>
                        {combinedChartData.datasets && combinedChartData.datasets.length > 0 ? (
                            <Line data={combinedChartData} options={combinedOptions} />
                        ) : (
                            <p>No data to display. Please select athletes to view the chart.</p>
                        )}
                    </TabPanel>
                    <TabPanel>
                        <TotalVolume />
                    </TabPanel>
                </Tabs>
            </div>
            <div className="side-bar">
                <div className="date-picker-container">
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                        className="date-picker input-box"
                        popperClassName="popper"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="End Date"
                        className="date-picker input-box"
                        popperClassName="popper"
                    />
                    <button onClick={handleResetFilter} className="button">
                        Reset Dates
                    </button>
                </div>
                <Select
                    isMulti
                    name="athletes"
                    options={athleteOptions}
                    className="athlete-select"
                    classNamePrefix="select"
                    onChange={handleAthleteSelection}
                    styles={customStyles}
                    placeholder="Select Athlete/s"
                />
                <button onClick={openModal} className="button">
                    Create Group
                </button>
                <Select
                    name="groups"
                    options={groupOptions}
                    className="group-select"
                    classNamePrefix="select"
                    onChange={(selected) => handleGroupSelection(selected)}
                    value={groupOptions.find(option => option.value === selectedGroup)} 
                    styles = {customStyles}
                    placeholder="Select Group"
                />
                {selectedGroup && (
                    <div>
                        <button onClick={openRenameModal} className="button">
                            Rename Group
                        </button>
                        <button onClick={openDeleteModal} className="button" style={{ backgroundColor: '#dc3545' }}>
                            Delete Group
                        </button>
                    </div>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
                contentLabel="Name Group Modal"
            >
                <h2>Name the Group</h2>
                <input
                    type="text"
                    value={groupName}
                    onChange={handleGroupNameChange}
                    placeholder="Group Name"
                    style={inputStyles}
                />
                <button onClick={handleCreateGroup} className="button">
                    Save Group
                </button>
                <button onClick={closeModal} className="button" style={{ backgroundColor: '#ccc' }}>
                    Cancel
                </button>
            </Modal>

            <Modal
                isOpen={renameModalIsOpen}
                onRequestClose={closeRenameModal}
                style={customModalStyles}
                contentLabel="Rename Group Modal"
            >
                <h2>Rename the Group</h2>
                <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="New Group Name"
                    className="input-box"
                    style={inputStyles}
                />
                <button onClick={handleRenameGroup} className="button">
                    Rename Group
                </button>
                <button onClick={closeRenameModal} className="button" style={{ backgroundColor: '#ccc' }}>
                    Cancel
                </button>
            </Modal>

            <Modal
                isOpen={deleteModalIsOpen}
                onRequestClose={closeDeleteModal}
                style={customModalStyles}
                contentLabel="Delete Group Modal"
            >
                <h2>Are you sure you want to delete this group?</h2>
                <button onClick={handleDeleteGroup} className="button" style={{ backgroundColor: '#dc3545' }}>
                    Confirm
                </button>
                <button onClick={closeDeleteModal} className="button" style={{ backgroundColor: '#ccc' }}>
                    Cancel
                </button>
            </Modal>
        </div>
    );

};
export default Dashboard;
    
