// src/components/TransactionList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Transaction List</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3 border-b">Title</th>
              <th className="px-4 py-3 border-b">Category</th>
              <th className="px-4 py-3 border-b">Price</th>
              <th className="px-4 py-3 border-b">Date</th>
              <th className="px-4 py-3 border-b">Sold</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {transactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <td className="px-4 py-3 border-b">{transaction.title}</td>
                <td className="px-4 py-3 border-b">{transaction.category}</td>
                <td className="px-4 py-3 border-b">${transaction.price}</td>
                <td className="px-4 py-3 border-b">
                  {new Date(transaction.dateOfSale).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-b">
                  <span
                    className={`${
                      transaction.isSold ? "text-green-500" : "text-red-500"
                    } font-semibold`}
                  >
                    {transaction.isSold ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
