// src/components/BarChart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [barData, setBarData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions/bar-chart?month=November");
        const data = await response.json();
        
        // Format data for the Bar chart
        const chartData = {
          labels: data.map(item => item.range),
          datasets: [
            {
              label: "Number of Transactions",
              data: data.map(item => item.count),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1
            }
          ]
        };
        
        setBarData(chartData);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sales by Price Range</h2>
      {barData.length === 0 ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="flex justify-center items-center">
          <Bar 
            data={barData} 
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Sales by Price Range',
                  font: { size: 20 },
                  color: '#333'
                },
                tooltip: {
                  backgroundColor: '#333',
                  titleFont: { size: 14 },
                  bodyFont: { size: 12 },
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BarChart;
