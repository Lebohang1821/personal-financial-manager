const pool = require('./db_connection');

// Example function to query the database
function fetchCustomers() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from the pool:", err);
      return;
    }

    const sql = "SELECT * FROM `customer_profile`"; // Change this to your actual table name
    connection.query(sql, (error, results) => {
      connection.release(); // Always release the connection back to the pool

      if (error) {
        console.error("Error executing query:", error);
        return;
      }

      console.log("Query results:", results);
    });
  });
}

// Call the function to fetch customers
fetchCustomers();
