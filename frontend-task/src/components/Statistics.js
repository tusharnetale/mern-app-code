// src/components/Statistics.js
import React, { useState } from "react";
import axios from "axios";

const Statistics = () => {
  const [month, setMonth] = useState("January");
  const [statistics, setStatistics] = useState(null);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions/statistics?month=${month}`);
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <div className="mb-4">
        <input
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Enter month (e.g., January)"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={fetchStatistics}
          className="ml-4 bg-blue-500 text-white p-2 rounded"
        >
          Get Statistics
        </button>
      </div>

      {statistics && (
        <div>
          <p>Total Sale Amount: ${statistics.totalSaleAmount}</p>
          <p>Sold Items: {statistics.soldItems}</p>
          <p>Not Sold Items: {statistics.notSoldItems}</p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
