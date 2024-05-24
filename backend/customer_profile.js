const express = require('express');
const pool = require('./db_connection'); // Ensure this file exports the connection pool

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to check database connection
app.use((req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from the pool:", err);
      return res.status(500).send('Database connection failed');
    }

    const sql = "SELECT 1 FROM `customer_profile` LIMIT 1"; // A simple query to check table connection
    connection.query(sql, (error) => {
      connection.release(); // Always release the connection back to the pool

      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).send('Table connection failed');
      }

      console.log("Table connection successful");
      next(); // Proceed to the next middleware or route handler
    });
  });
});

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running and database connection is successful');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
