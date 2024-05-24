const express = require('express');
const pool = require('./db_connection'); // Ensure this file exports the connection pool

const app = express();
const PORT = process.env.PORT || 8080;

// Route to fetch and display data from the database
app.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from the pool:", err);
      return res.status(500).send('Database connection failed');
    }

    const sql = "SELECT * FROM customer_profile"; // Change this to your actual table name
    connection.query(sql, (error, results) => {
      connection.release(); // Always release the connection back to the pool

      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).send('Error fetching data from database');
      }

      res.json(results); // Send the JSON response containing the data
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
