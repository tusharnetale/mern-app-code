import React, { useState, useEffect } from 'react';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('');
  const [page, setPage] = useState(1);

  // Function to fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      // Construct query parameters for month and page
      const queryParams = new URLSearchParams();
      if (month) queryParams.append('month', month);
      queryParams.append('page', page);

      const response = await fetch(`http://localhost:5000/api/transactions?${queryParams.toString()}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Fetch transactions when dependencies change
  useEffect(() => {
    fetchTransactions();
  }, [month, page]);

  // Event handlers for user input
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when search changes
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1); // Reset to page 1 when month changes
  };

  const handlePageChange = (direction) => {
    if (direction === 'next') {
      setPage((prevPage) => prevPage + 1);
    } else if (direction === 'prev' && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // Filter transactions based on search and month
  const filteredTransactions = transactions.filter(transaction => {
    const transactionMonth = new Date(transaction.dateOfSale).toLocaleString('default', { month: 'long' });
    const isInMonth = !month || transactionMonth === month;  // Now comparing full month name
    const matchesSearch = transaction.title.toLowerCase().includes(search.toLowerCase());
    return isInMonth && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-50">
      {/* Month Dropdown */}
      <div className="mb-4 flex items-center">
        <label className="mr-2 text-lg text-gray-700">Select Month:</label>
        <select
          value={month}
          onChange={handleMonthChange}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All</option>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((monthName) => (
            <option key={monthName} value={monthName}>{monthName}</option>
          ))}
        </select>
      </div>

      {/* Search Box */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by title"
          className="p-2 border border-gray-300 rounded-lg shadow-sm mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setSearch('')}
          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Clear
        </button>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Date of Sale</th>
              <th className="px-4 py-2 border-b">Is Sold</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">No transactions found</td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-4 py-2 border-b">{transaction.title}</td>
                  <td className="px-4 py-2 border-b">{transaction.description}</td>
                  <td className="px-4 py-2 border-b">${transaction.price}</td>
                  <td className="px-4 py-2 border-b">{transaction.category}</td>
                  <td className="px-4 py-2 border-b">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{transaction.isSold ? 'Yes' : 'No'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange('prev')}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange('next')}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
