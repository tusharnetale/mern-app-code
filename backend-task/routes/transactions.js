// routes/transactions.js
import express from 'express';
import { 
  initializeDatabase, 
  listTransactions, 
  getStatistics, 
  getBarChartData, 
  getPieChartData, 
  getCombinedData 
} from '../controllers/transactionController.js';

const router = express.Router();

// Initialize database
router.get('/initialize', initializeDatabase);

// List transactions with search and pagination
router.get('/', async (req, res) => {
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
});

// Get statistics for selected month
router.get('/statistics', getStatistics);

// Get bar chart data for price ranges
router.get('/bar-chart', getBarChartData);

// Get pie chart data by category
router.get('/pie-chart', getPieChartData);

// Get combined data
router.get('/combined-data', getCombinedData);

export default router;
