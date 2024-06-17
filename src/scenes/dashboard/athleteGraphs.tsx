
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line, Bar } from "react-chartjs-2";
import { parseCSV } from "../../utils/csvParser";
import "chartjs-adapter-date-fns";
import { parse, isValid, isWithinInterval } from "date-fns";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Dashboard.css";
import { useParams } from "react-router-dom";

interface AthleteDashboardProps {
    firstName?: string;
}

const AthleteDashboard = ({ firstName }: AthleteDashboardProps) => {
    const [lineChartData, setLineChartData] = useState({});
    const [combinedChartData, setCombinedChartData] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [maxOTI, setMaxOTI] = useState(10); 
    const [dataFound, setDataFound] = useState(true); 

    let athleteName = firstName;

    if (firstName === undefined) {
        const { firstName } = useParams();
        athleteName = firstName;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/data.csv");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const text = await response.text();
                const parsedData = await parseCSV(text);
    
                const athleteData = parsedData.filter(
                    (item) => item["Athlete's Name"] === athleteName
                );
    
                if (athleteData.length === 0) {
                    setDataFound(false);
                    return;
                }
    
                const dates = [];
                const rpes = [];
                const otis = [];
                let maxOTIValue = 10;
    
                athleteData.forEach((item) => {
                    const timestamp = item.Timestamp?.trim();
                    const date = parse(timestamp, 'dd/MM/yyyy HH:mm:ss', new Date());
                    const rpeValue = item.RPE != null ? item.RPE.toString().trim() : '';
                    const otiValue = item.OTI != null ? item.OTI.toString().trim() : '';
                    const rpe = parseFloat(rpeValue);
                    const oti = parseFloat(otiValue);
    
                    if (isValid(date) && !isNaN(rpe)) {
                        dates.push(date);
                        rpes.push(rpe);
                        otis.push(isNaN(oti) ? 0 : oti);
                        if (oti > maxOTIValue) {
                            maxOTIValue = oti;
                        }
                    }
                });
    
                setMaxOTI(maxOTIValue); 
    
                setLineChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: "RPE over Time",
                            data: dates.map((date, index) => ({
                                x: date,
                                y: rpes[index],
                            })),
                            fill: false,
                            borderColor: "rgba(75,192,192,1)",
                            backgroundColor: "rgba(75,192,192,0.2)",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "black",
                            pointHoverBorderColor: "black",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                        },
                    ],
                });
    
                setCombinedChartData({
                    labels: dates,
                    datasets: [
                        {
                            type: "bar",
                            label: "RPE",
                            data: dates.map((date, index) => ({
                                x: date,
                                y: rpes[index],
                            })),
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)",
                            borderWidth: 1,
                        },
                        {
                            type: "line",
                            label: "OTI",
                            data: dates.map((date, index) => ({
                                x: date,
                                y: otis[index],
                            })),
                            fill: false,
                            borderColor: "rgba(153,102,255,1)",
                            backgroundColor: "rgba(153,102,255,0.2)",
                            pointBorderColor: "rgba(153,102,255,1)",
                            pointBackgroundColor: "rgba(153,102,255,1)",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "black",
                            pointHoverBorderColor: "black",
                            pointHoverBorderWidth: 2,
                            pointRadius: 5,
                            pointHitRadius: 10,
                        },
                    ],
                });
    
                setDataFound(true); 
            } catch (error) {
                console.error("Error parsing CSV file:", error);
                setDataFound(false); 
            }
        };
    
        fetchData();
    }, [athleteName]);
    
    

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
        const filteredDates = [];
        const filteredRpes = [];
        const filteredOtis = [];
    
        lineChartData.labels.forEach((date, index) => {
            if (isWithinInterval(date, { start, end })) {
                filteredDates.push(date);
                filteredRpes.push(lineChartData.datasets[0].data[index].y);
                filteredOtis.push(combinedChartData.datasets[1].data[index].y);
            }
        });
    
        setLineChartData({
            labels: filteredDates,
            datasets: [
                {
                    label: "RPE over Time",
                    data: filteredRpes.map((rpe, index) => ({
                        x: filteredDates[index],
                        y: rpe,
                    })),
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: "rgba(75,192,192,0.2)",
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "black",
                    pointHoverBorderColor: "black",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                },
            ],
        });
    
        setCombinedChartData({
            labels: filteredDates,
            datasets: [
                {
                    type: "bar",
                    label: "RPE",
                    data: filteredRpes.map((rpe, index) => ({
                        x: filteredDates[index],
                        y: rpe,
                    })),
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    borderWidth: 1,
                },
                {
                    type: "line",
                    label: "OTI",
                    data: filteredOtis.map((oti, index) => ({
                        x: filteredDates[index],
                        y: oti,
                    })),
                    fill: false,
                    borderColor: "rgba(153,102,255,1)",
                    backgroundColor: "rgba(153,102,255,0.2)",
                    pointBorderColor: "rgba(153,102,255,1)",
                    pointBackgroundColor: "rgba(153,102,255,1)",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "black",
                    pointHoverBorderColor: "black",
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                },
            ],
        });
    };

    const lineOptions = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        day: "MM/dd/yyyy",
                    },
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    maxTicksLimit: 10,
                },
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "RPE",
                },
                beginAtZero: true,
                max: 10,
            },
        },
    };
    
    const combinedOptions = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        day: "MM/dd/yyyy",
                    },
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    maxTicksLimit: 10,
                },
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Value",
                },
                beginAtZero: true,
                max: maxOTI, 
            },
        },
    };

    return (
        <div className="dashboard-container">
            {dataFound ? (
                <div className="chart-container">
                    <Tabs>
                        <TabList>
                            <Tab>RPE over Time</Tab>
                            <Tab>OTI vs RPE</Tab>
                        </TabList>

                        <TabPanel>
                            {lineChartData.datasets &&
                            lineChartData.datasets.length > 0 ? (
                                <Line
                                    data={lineChartData}
                                    options={lineOptions}
                                />
                            ) : (
                                <p>
                                    No data to display. Please select dates to
                                    view the chart.
                                </p>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {combinedChartData.datasets &&
                            combinedChartData.datasets.length > 0 ? (
                                <Bar
                                    data={combinedChartData}
                                    options={combinedOptions}
                                />
                            ) : (
                                <p>
                                    No data to display. Please select dates to
                                    view the chart.
                                </p>
                            )}
                        </TabPanel>
                    </Tabs>
                </div>
            ) : (
                <p>
                    No data found for {athleteName}. Please check the CSV file.
                </p>
            )}
            <div className="side-bar">
                <div className="date-picker-container">
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                        className="date-picker"
                        popperClassName="popper"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="End Date"
                        className="date-picker"
                        popperClassName="popper"
                    />
                </div>
            </div>
        </div>
    );
};

export default AthleteDashboard;