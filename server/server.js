require('dotenv').config();
const express = require('express');
const path = require('path');
const oracledb = require('oracledb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Add this line to parse JSON bodies

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your React app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable cookies and authentication headers
  optionsSuccessStatus: 204, // Return a 204 status for preflight requests
};

app.use(cors(corsOptions));


// Configure the Oracle connection
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Endpoint for handling search requests
app.post('/search', async (req, res) => {

  try {
    // Connect to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Get the search term from the request body
    // ensure that term is not empty
    const { term } = req.body;
    if (!term) {
      return res.status(400).json({ error: 'Missing or invalid term in the request body' });
    }

    // Construct a dynamic SQL query to search across all columns
    const query = `
    SELECT *
    FROM sap_orchestration.CC_INFO
    WHERE LOWER(CC_ID) LIKE LOWER('%${term}%')
       OR LOWER(MASTERLANGUAGE) LIKE LOWER('%${term}%')
       OR LOWER(RESPONSIBLEUSERACCOUNTID) LIKE LOWER('%${term}%')
       OR LOWER(LASTCHANGEUSERACCOUNTID) LIKE LOWER('%${term}%')
       OR LOWER(LASTCHANGEDATETIME) LIKE LOWER('%${term}%')
       OR LOWER(FOLDERPATHID) LIKE LOWER('%${term}%')
       OR LOWER(CC_DESCRIPTION) LIKE LOWER('%${term}%')
       OR LOWER(PARTYID) LIKE LOWER('%${term}%')
       OR LOWER(COMPONENTID) LIKE LOWER('%${term}%')
       OR LOWER(CHANNELID) LIKE LOWER('%${term}%')
       OR LOWER(ADA_META_NAME) LIKE LOWER('%${term}%')
       OR LOWER(ADA_META_NAMESPACE) LIKE LOWER('%${term}%')
       OR LOWER(ADA_META_SCVERSIONID) LIKE LOWER('%${term}%')
       OR LOWER(DIRECTION) LIKE LOWER('%${term}%')
       OR LOWER(TRANSPORTPROTOCOL) LIKE LOWER('%${term}%')
       OR LOWER(TRANSPORTPROTOCOLVERSION) LIKE LOWER('%${term}%')
       OR LOWER(MESSAGEPROTOCOL) LIKE LOWER('%${term}%')
       OR LOWER(MESSAGEPROTOCOLVERSION) LIKE LOWER('%${term}%')
       OR LOWER(ADAPTERENGINENAME) LIKE LOWER('%${term}%')
    `;

    // format result into Javascript Object
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

    // Execute the SQL query
    const result = await connection.execute(query);

    // Send the results back to the frontend
    res.json(result.rows);

    // Release the Oracle connection
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
