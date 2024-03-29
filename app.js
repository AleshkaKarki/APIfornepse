const express = require('express');
const mysql = require('mysql');
var cors = require('cors')

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors())


const options = {
  definition: {
    openapi : '3.0.0',
    info : {
      title: 'Node JS API Project for mysql',
      version: '1.0.0'
    },
    servers:[
      {
        url: 'http://localhost:3000/'
      }
    ]
  },
  apis: ['./app.js']
}
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = 3000;

// // const express = require('express');
// const router = express.Router();

// module.exports = router;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nepse porfolio',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

/**
 * @swagger
 * /API/users:
 *  get:
 *    summary: This api is used to check if get method is working or not 
 *    description: This api is used to check if get method is working or not 
 *    responses:
 *          200:
 *            description: To test get method
 */
//Route to fetch user from database
app.get('/API/users', (req, res) => {
  const query = 'SELECT * FROM user';

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Send the data to the browser
    res.json(results);
  });
});
/**
 * @swagger
 * /API/user/John:
 *  get:
 *    summary: This api is used to check if get method is working or not 
 *    description: This api is used to check if get method is working or not 
 *    responses:
 *          200:
 *            description: To test get method
 */
// Define a route to fetch data(username) from the database
// app.get('/API/user/:username', (req, res) => {
//   const username = req.params.username;
//   const query = 'SELECT * FROM user WHERE username = ?';

//   // Execute the query
//   db.query(query, [username], (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     if (results.length === 0) {
//       // User with the specified username not found
//       res.status(404).send('User not found');
//       return;
//     }

//     // Send the data to the browser
//     res.json(results[0]);
//   });
// });
app.delete('/api/user/:username', (req, res) => {
  const username = req.params.username;
  const query = 'DELETE FROM user WHERE username = ?';

  // Execute the query
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.affectedRows === 0) {
      // User with the specified username not found
      res.status(404).send('User not found');
      return;
    }

    // Return a success message
    res.json({ message: 'User deleted successfully' });
  });
});

// // Update User Endpoint
// app.put('/api/user/:username', (req, res) => {
//   const username = req.params.username;
//   const updatedUserData = req.body;

//   console.log(username);
//   console.log(updatedUserData);

//   if (!updatedUserData) {
//     res.status(400).send('Bad Request: Invalid request body');
//     return;
//   }

//   const query = 'UPDATE user SET ? WHERE username = ?';

//   // Execute the query
//   db.query(query, [updatedUserData, username], (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }

//     if (results.affectedRows === 0) {
//       // User with the specified username not found
//       res.status(404).send('User not found');
//       return;
//     }

//     // Return a success message or updated user data
//     res.json({ message: 'User updated successfully' });
//   });
// });


      
 /**
 * @swagger
 * /API/user_id/909:
 *  get:
 *    summary: This api is used to check if get method is working or not 
 *    description: This api is used to check if get method is working or not 
 *    responses:
 *          200:
 *            description: To test get method
 */     
// Define a route to fetch data(user_id) from the database
app.get('/API/user_id/:id', (req, res) => {
  const user_id = req.params.id;
  const query = 'SELECT * FROM user WHERE user_id = ?';

  // Execute the query
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      // User with the specified user_id not found
      res.status(404).send('user_id not found');
      return;
    }

    // Send the data to the browser
    res.json(results[0]);
  });
});
 /**
 * @swagger
 * /API/user_details/2024-01-02:
 *  get:
 *    summary: This api is used to check if get method is working or not 
 *    description: This api is used to check if get method is working or not 
 *    responses:
 *          200:
 *            description: To test get method
 */ 
// Define a route to fetch data(DOB) from the database(user_details)
app.get('/API/user_details/:DOB', (req, res) => {
  const DOB = req.params.DOB;
  const query = 'SELECT * FROM user_details WHERE DOB = ?';

  // Execute the query
  db.query(query, [DOB], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      // User with the specified DOB not found
      res.status(404).send('DOB not found');
      return;
    }

    // Send the data to the browser
    res.json(results[0]);
  });
});
 /**
 * @swagger
 * /API/userdetails/Ratopul:
 *  get:
 *    summary: This api is used to check if get method is working or not 
 *    description: This api is used to check if get method is working or not 
 *    responses:
 *          200:
 *            description: To test get method
 */ 
// Define a route to fetch data(address) from the database(user_details)
app.get('/API/userdetails/:address', (req, res) => {
  const address = req.params.address;
  const query = 'SELECT * FROM user_details WHERE address = ?';

  //Execute the query
  db.query(query, [address], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
// console.error('Error executing query:', err);
// console.log('Query:', query);
// console.log('Parameters:', [address]);


    if (results.length === 0) {
      // User with the specified address not found
      res.status(404).send('Address not found');
      return;
    }

    // Send the data to the browser
    res.json(results[0]);
  });
});
//  /**
//  * @swagger
//  * /API/validation/george@gmail.com:
//  *  get:
//  *    summary: This api is used to check if get method is working or not 
//  *    description: This api is used to check if get method is working or not 
//  *    responses:
//  *          200:
//  *            description: To test get method
//  */ 
// Define a route to fetch data(email) from the database
app.get('/API/validation/:email', (req, res) => {
  const email = req.params.email;
  const query = 'SELECT * FROM validation WHERE email = ?';

  // Execute the query
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      // User with the specified email not found
      res.status(404).send('Email not found');
      return;
    }
  });
});
// Middleware to parse JSON in requests
app.use(express.json());
/**
 * @swagger
 * /API/user:
 *  post:
 *    summary: This API is used to check if the POST method is working or not.
 *    description: This API is used to check if the POST method is working or not.
 *    requestBody:
 *      description: The data to be sent in the request body.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful response for testing the POST method.
 */
 
// Endpoint to handle POST requests to insert a user
app.post('/api/user', (req, res) => {
  const userData = req.body;

  // Insert data into the 'user' table
  const insertQuery = 'INSERT INTO user SET ?';

  db.query(insertQuery, userData, (err, results) => {
    if (err) {
      console.error('Error executing insert query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Data inserted successfully. Inserted ID:', results.insertId);

    // Respond with a success message or the inserted data
    res.status(201).json({ message: 'User inserted successfully', insertedId: results.insertId });
  });
});

// Middleware to parse JSON
app.use(express.json());
/**
 * @swagger
 * /API/user/134:
 *  put:
 *    summary: This API is used to check if the PUT method is working or not.
 *    description: This API is used to check if the PUT method is working or not.
 *    requestBody:
 *      description: 
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *    responses:
 *      200:
 *        description: Successful response for testing the POST method.
 */
// Route to handle the PUT request for updating a record
// app.put('/API/user/:id', (req, res) => {
//   const user_id = req.params.id;
//   const updatedData = req.body; // Assuming you send the updated data in the request body

//   const query = 'UPDATE user SET ? WHERE user_id = ?';

//   // Execute the query
//   db.query(query, [updatedData, user_id], (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }

//     if (result.affectedRows === 0) {
//       // No rows were affected, indicating that the user with the specified ID was not found
//       res.status(404).send('User not found');
//       return;
//     }

//     // Record updated successfully
//     res.status(200).send('User updated successfully');
//   });
// });
// /**
//  * @swagger
//  * /API/user/login:
//  *  post:
//  *    summary: This API is used to check if the POST method is working or not.
//  *    description: This API is used to check if the POST method is working or not.
//  *    requestBody:
//  *      description: 
//  *      content:
//  *        application/json:
//  *          schema:
//  *            type: object
//  *            properties:
//  *              username:
//  *                type: string
//  *    responses:
//  *      200:
//  *        description: Successful response for testing the POST method.
//  */
// Route for user login
app.post('/API/user/login', (req, res) => {
  const { username, password } = req.body;
 console.log(username,password)
 //hashing algorithm should be implemented
  // Use SQL query to check user credentials
  const query = 'SELECT * FROM user WHERE (email = ? OR username= ?) AND password = ?';

  db.query(query, [username, username, password], (err, results) => {
    console.log(err, results);
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// // Define Swagger specification options
// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Sample API',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./routes/*.js'], // Path to the API routes
// };

// const specs = swaggerJsdoc(options);

// // Serve Swagger UI at /api-docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//for signup
// app.post('/api/user/signup', async (req, res) => {
//   try {
//     const { username, password, phone_number } = req.body;

//     // Validate input (e.g., check if username is unique, password requirements, etc.)

//     // Save user to the database
//     const newUser = new User({ username, password, phone_number });
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
app.post('/api/user_signup/signup', (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
  // Using placeholders to prevent SQL injection
  db.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.affectedRows > 0) {
      console.log('Sign up successful');
      // Successful insertion
      // res.redirect('/api/user/login');
      console.log('asdfghasdfgh');
    } else {
      // No rows affected, insertion might have failed
      res.status(500).send('User not inserted. Check your query and data.');
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
