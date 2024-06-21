const express = require('express');
const multer = require('multer'); // For handling file uploads
const path = require('path');
const pool = require('./db_connection');

const app = express();
const PORT = process.env.PORT || 8080;

// Multer configuration
const storage = multer.diskStorage({
  destination: './uploads/', // Directory to save uploaded files
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve uploaded profile pictures
app.use('/profile-pics', express.static('uploads'));

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

// Route to update user profile information including profile picture
app.post('/update-profile', upload.single('profilePic'), (req, res) => {
  const { username, email, bio, phoneNumber, bankName, bankType } = req.body;
  const profilePicPath = req.file.path; // File path of the uploaded profile picture

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from the pool:", err);
      return res.status(500).send('Database connection failed');
    }

    const sql = "UPDATE customer_profile SET Username=?, Email=?, Bio=?, Phone_number=?, Bank_name=?, Bank_type=?, Profile_pic=? WHERE Customer_id=1"; // Change this query according to your table structure and conditions
    connection.query(sql, [username, email, bio, phoneNumber, bankName, bankType, profilePicPath], (error, results) => {
      connection.release(); // Always release the connection back to the pool

      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).send('Error updating profile in the database');
      }

      res.send('Profile updated successfully');
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});