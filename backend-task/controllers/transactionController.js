// export const listTransactions = async (req, res) => {
//   try {
//     const { month, search, page = 1 } = req.query;  // Retrieve page, month, and search
//     const monthIndex = new Date(`${month} 1, 2023`).getMonth(); // Convert month to index
//     const pageSize = 10;  // Limit results per page
//     const skip = (page - 1) * pageSize;

//     const query = {
//       $expr: { $eq: [{ $month: '$dateOfSale' }, monthIndex + 1] }, // Match month
//       $or: [
//         { title: { $regex: search, $options: 'i' } },  // Search by title
//         { description: { $regex: search, $options: 'i' } },  // Search by description
//         { price: { $regex: search, $options: 'i' } },  // Search by price
//       ]
//     };

//     const transactions = await Transaction.find(query).skip(skip).limit(pageSize);
//     const totalTransactions = await Transaction.countDocuments(query);

//     res.status(200).json({
//       transactions,
//       totalPages: Math.ceil(totalTransactions / pageSize),
//       currentPage: parseInt(page)
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


controllers/transactionController.js
import Transaction from '../models/Transaction.js';

export const listTransactions = async (req, res) => {
  try {
    const { month, search, page } = req.query;

    // Set default values if no parameters are passed
    const currentMonth = month || 'March';
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = 10;  // Number of items per page

    // Build the query for filtering transactions
    const query = { 
      // Filter by month (dateOfSale should be adjusted to reflect your database structure)
      dateOfSale: { 
        $gte: new Date(`${currentMonth} 1, 2024`), 
        $lt: new Date(`${currentMonth} 31, 2024`) 
      }
    };

    // If search is provided, filter transactions by title (case-insensitive search)
    if (search) {
      query.title = { $regex: search, $options: 'i' };  // Case-insensitive title search
    }

    // Fetch the transactions from the database
    const transactions = await Transaction.find(query)
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    // Return the filtered transactions
    res.json(transactions);
    
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// You can leave other functions (getStatistics, getBarChartData, etc.) as is.
