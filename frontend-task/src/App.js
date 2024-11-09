// src/App.js
import React from 'react';
import './App.css'; // Import custom styles if you have any
import TransactionTable from './components/TransactionTable'; // Import the TransactionTable component
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import Statistics from './components/Statistics';

function App() {
  return (
    <div className="App font-sans bg-gray-100 min-h-screen">
      {/* Header of the app */}
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-3xl font-semibold">Transaction Management System</h1>
      </header>

      {/* Main content area */}
      <main className="p-6 space-y-6">
        {/* Transaction Table */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <TransactionTable />
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <Statistics />
        </div>
        
        {/* Charts Section (Pie Chart and Bar Chart displayed horizontally) */}
        <div className="flex space-x-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-lg p-4 w-1/2">
            <PieChart />
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow-lg p-4 w-1/2">
            <BarChart />
          </div>
        </div>


      </main>
    </div>
  );
}

export default App;
