require('dotenv').config();
const express = require('express');
const path = require('path');
const oracledb = require('oracledb');
const cors = require('cors');
require('dotenv').config();

function paginateData(data, page, itemsPerPage) {
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  return data.slice(startIdx, endIdx);
}

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
// Express route for handling pagination
app.post('/search', async (req, res) => {
  try {
    const { term, page, itemsPerPage } = req.body;

    // Connect to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

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
    const allData = await connection.execute(query);

    // Paginate the data based on the requested page and items per page
    // const paginatedData = paginateData(allData.rows, page, itemsPerPage);

    // Send the paginated data to the client
    res.json(allData.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Enspoint for handling search via Detailed Formulaire
app.post('/filteredSearch', async (req, res) => {

  try {
    // Connect to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    const body = req.body;
    // Get the search filters from the request body
    // ensure that filters is not empty
    const { filters } = body;
    if (!filters) {
      return res.status(400).json({ error: 'Missing or invalid filters in the request body' });
    }

    // Construct a dynamic SQL query to search across all columns
    const query = `
    SELECT *
    FROM sap_orchestration.CC_INFO
    WHERE LOWER(CC_ID) LIKE LOWER('%${filters["CC_ID"]}%')
       OR LOWER(MASTERLANGUAGE) LIKE LOWER('%${filters["MASTERLANGUAGE"]}%')
       OR LOWER(RESPONSIBLEUSERACCOUNTID) LIKE LOWER('%${filters["RESPONSIBLEUSERACCOUNTID"]}%')
       OR LOWER(LASTCHANGEUSERACCOUNTID) LIKE LOWER('%${filters["LASTCHANGEUSERACCOUNTID"]}%')
       OR LOWER(LASTCHANGEDATETIME) LIKE LOWER('%${filters["LASTCHANGEDATETIME"]}%')
       OR LOWER(FOLDERPATHID) LIKE LOWER('%${filters["FOLDERPATHID"]}%')
       OR LOWER(CC_DESCRIPTION) LIKE LOWER('%${filters["CC_DESCRIPTION"]}%')
       OR LOWER(PARTYID) LIKE LOWER('%${filters["PARTYID"]}%')
       OR LOWER(COMPONENTID) LIKE LOWER('%${filters["COMPONENTID"]}%')
       OR LOWER(CHANNELID) LIKE LOWER('%${filters["CHANNELID"]}%')
       OR LOWER(ADA_META_NAME) LIKE LOWER('%${filters["ADA_META_NAME"]}%')
       OR LOWER(ADA_META_NAMESPACE) LIKE LOWER('%${filters["ADA_META_NAMESPACE"]}%')
       OR LOWER(ADA_META_SCVERSIONID) LIKE LOWER('%${filters["ADA_META_SCVERSIONID"]}%')
       OR LOWER(DIRECTION) LIKE LOWER('%${filters["DIRECTION"]}%')
       OR LOWER(TRANSPORTPROTOCOL) LIKE LOWER('%${filters["TRANSPORTPROTOCOL"]}%')
       OR LOWER(TRANSPORTPROTOCOLVERSION) LIKE LOWER('%${filters["TRANSPORTPROTOCOLVERSION"]}%')
       OR LOWER(MESSAGEPROTOCOL) LIKE LOWER('%${filters["MESSAGEPROTOCOL"]}%')
       OR LOWER(MESSAGEPROTOCOLVERSION) LIKE LOWER('%${filters["MESSAGEPROTOCOLVERSION"]}%')
       OR LOWER(ADAPTERENGINENAME) LIKE LOWER('%${filters["ADAPTERENGINENAME"]}%')
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
