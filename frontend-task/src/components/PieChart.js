// src/components/PieChart.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PieChart = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions/pie-chart?month=January");
        setPieChartData(response.data);
      } catch (error) {
        console.error("Error fetching pie chart data", error);
      }
    };
    fetchPieChartData();
  }, []);

  const data = {
    labels: pieChartData.map(item => item.category),
    datasets: [
      {
        data: pieChartData.map(item => item.itemCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sales Data for January</h2>
      <div className="flex justify-center items-center">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChart;
