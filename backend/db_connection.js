const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

// Configure MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'customer_information', // Replace with your database name
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Endpoint to handle updating profile
app.post('/update-profile', (req, res) => {
  const { username, email, bio, phoneNumber, bankName, bankType, profilePic } = req.body;

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).send('Database connection error');
    }

    // Update the customer_profile table with the received data
    const sql = `UPDATE customer_profile 
                 SET Username=?, Email=?, Bio=?, Phone_number=?, Bank_name=?, Bank_type=?, Profile_pic=? 
                 WHERE Customer_id=1`; // Adjust the WHERE clause based on your needs
    connection.query(sql, [username, email, bio, phoneNumber, bankName, bankType, profilePic], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error updating profile:', error);
        return res.status(500).send('Error updating profile in the database');
      }

      res.send('Profile updated successfully');
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
