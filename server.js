const express = require('express');
const path = require('path');
const mysql = require("mysql2/promise");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const cors = require('cors');


const app = express();


// const hashedPassword = await bcrypt.hash(password, 10);

app.use(cors());
app.use(express.json()); 


const isAuth = (req, res, next) => next();

app.use(express.static(path.join(__dirname, 'public')));




app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "landingPg.html"));
});

// app.get('/user/dashboard/view-projects/:dbName/json-converters', isAuth, (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'user-dashboard.html'));
// });

app.get('/user/dashboard/view-projects/:dbName/json-converters*', isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user-dashboard.html'));
});



app.get([
  '/user/dashboard/home',
  '/user/dashboard/modern-data-types',
  '/user/dashboard/view-projects',
  '/user/dashboard/view-projects/create-project',
  '/user/dashboard/how-to-use'
], isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user-dashboard.html'));
});




const port = process.env.PORT || 3100;








const defaultPool = mysql.createPool({
  host: "localhost",
  user: "root", 
  password: "mysql123", 
});




// connection pool for dataMoldProjectDb
const projectPool = mysql.createPool({
  host: "localhost",
  user: "root", 
  password: "mysql123", 
  database: "dataMoldProjectDb",
});




app.get("/api/projects", async (req, res) => {
  try {
    const [results] = await projectPool.query("SELECT database_name FROM projects");
    res.json(results);
  } catch (err) {
    console.error("error fetching projects:", err);
    res.status(500).json({ error: "internal server error" });
  }
});





app.post("/create-database", async (req, res) => {
  const { database, user, password } = req.body;

  if (!database || !user || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await defaultPool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);

    await defaultPool.query(`CREATE DATABASE IF NOT EXISTS dataMoldProjectDb`);

    await defaultPool.query(`
      CREATE TABLE IF NOT EXISTS dataMoldProjectDb.projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        database_name VARCHAR(255) NOT NULL,
        db_user VARCHAR(255) NOT NULL,
        db_password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [userExists] = await defaultPool.query(
      `SELECT User FROM mysql.user WHERE User = ?`,
      [user]
    );

    if (userExists.length === 0) {
      await defaultPool.query(
        `CREATE USER '${user}'@'localhost' IDENTIFIED BY ?`,
        [password]
      );
    } else {
      await defaultPool.query(
        `ALTER USER '${user}'@'localhost' IDENTIFIED BY ?`,
        [password]
      );
    }

    await defaultPool.query(
      `GRANT ALL PRIVILEGES ON \`${database}\`.* TO '${user}'@'localhost'`
    );
    await defaultPool.query("FLUSH PRIVILEGES");

    await defaultPool.query(
      `INSERT INTO dataMoldProjectDb.projects (database_name, db_user, db_password, created_at) VALUES (?, ?, ?, NOW())`,
      [database, user, password]
    );

    return res.status(201).json({
      message: `Database '${database}' and user '${user}' created/updated successfully, and recorded in projects table`,
    });
  } catch (error) {
    console.error("Error creating database:", error);
    return res.status(500).json({ message: "Database creation failed", error });
  }
});






const modernDataTypes = require("./modernDataTypes");

app.post("/create-table-dbname/:dbName", async (req, res) => {
  const { dbName } = req.params;
  const { tableName, columns } = req.body;

  console.log("dBname", dbName);
  console.log("tableName", tableName);
  console.log("columns", columns)

  if (!tableName || !Array.isArray(columns) || columns.length === 0) {
    return res.status(400).json({ message: "Invalid request: tableName and columns are required." });
  }

  try {
    const dbPool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "mysql123",
      database: dbName,
    });

    let createTableQuery = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (id INT AUTO_INCREMENT PRIMARY KEY, `;
    
    const columnDefinitions = columns.map(({ column, type }) => {
      const sqlType = modernDataTypes[type.toUpperCase()]?.sqlType || "VARCHAR(255)";
      return `\`${column}\` ${sqlType} NOT NULL`;
    });

    createTableQuery += columnDefinitions.join(", ") + ")";


    await dbPool.query(createTableQuery);
    res.status(201).json({ message: `Table '${tableName}' created successfully in '${dbName}'` });
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json({ message: "Table creation failed", error });
  }
});






app.get("/api/table-desc/:dbName/:tableName", async (req, res) => {
  try {
      let { dbName, tableName } = req.params;


      dbName = decodeURIComponent(dbName);
      tableName = decodeURIComponent(tableName);

      console.log(`Fetching table structure for DB: ${dbName}, Table: ${tableName}`);

      await defaultPool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);

      const dbPool = mysql.createPool({
          host: "localhost",
          user: "root", 
          password: "mysql123",
          database: dbName,
      });

      const connection = await dbPool.getConnection();

      const [rows] = await connection.query(`DESC \`${tableName}\``);

      connection.release(); // Release connection

      return res.json(rows);
  } catch (error) {
      console.error("Error fetching table structure:", error);
      return res.status(500).json({ message: "Failed to fetch table structure", error });
  }
});









app.post("/join-tables", async (req, res) => {
  const { dbName } = req.params;
  const { tableA, tableB, commonColumn, columnsA, columnsB } = req.body;

  console.log("database:", dbName);
  console.log("table A:", tableA);
  console.log("table B:", tableB);
  console.log("common column:", commonColumn);
  console.log("columns A:", columnsA);
  console.log("columns B:", columnsB);

  if (!tableA || !tableB || !commonColumn || !Array.isArray(columnsA) || !Array.isArray(columnsB)) {
    return res.status(400).json({ message: "Invalid request: Missing required parameters." });
  }

  try {
    const dbPool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "mysql123",
      database: dbName,
    });

    const selectColumns = [
      ...columnsA.map(col => `A.\`${col}\``),
      ...columnsB.map(col => `B.\`${col}\``)
    ].join(", ");

    const joinQuery = `
      SELECT ${selectColumns}
      FROM \`${tableA}\` A
      INNER JOIN \`${tableB}\` B ON A.\`${commonColumn}\` = B.\`${commonColumn}\`;
    `;

    const [results] = await dbPool.promise().query(joinQuery);
    res.status(200).json({ message: "Joined data retrieved successfully", data: results });
  } catch (error) {
    console.error("Error executing join query:", error);
    res.status(500).json({ message: "Failed to join tables", error });
  }
});





app.post("/add-column/:dbName", async (req, res) => {
  const { dbName } = req.params;
  const { tableName, columnName, columnDefinition } = req.body;

  console.log("database:", dbName);
  console.log("table:", tableName);
  console.log("column name:", columnName);
  console.log("column def", columnDefinition);

  if (!tableName || !columnName || !columnDefinition) {
      return res.status(400).json({ message: "invalid request: Missing required parameters." });
  }

  try {
      const connection = await defaultPool.getConnection();
      await connection.query(`USE \`${dbName}\`;`);

      const alterQuery = `ALTER TABLE \`${tableName}\` ADD \`${columnName}\` ${columnDefinition};`;
      await connection.query(alterQuery);

      connection.release();

      res.status(200).json({ message: "column added successfully." });
  } catch (error) {
      console.error("error adding column:", error);
      res.status(500).json({ message: "failed to add column", error });
  }
});



app.put("/update-column/:dbName", async (req, res) => {
  const { dbName } = req.params;
  const { tableName, columnName, newValue, condition } = req.body;


  if (!tableName || !columnName || newValue === undefined || !condition) {
      return res.status(400).json({ message: "invalid request: missing required parameters" });
  }

  let connection;
  try {

      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${dbName}\`;`);

      const updateQuery = `UPDATE \`${tableName}\` SET \`${columnName}\` = ? WHERE ${condition};`;
      console.log("Executing Query:", updateQuery, "with value:", newValue);

      const [result] = await connection.query(updateQuery, [newValue]);

      res.status(200).json({ message: "column updated successfully.", result });
  } catch (error) {
      console.error("error updating column:", error);
      res.status(500).json({ message: "failed to update column", error });
  } finally {
      if (connection) connection.release(); 
  }
});



app.get("/show-column/:dbName", async (req, res) => {
  const { dbName } = req.params;
  const { tableName, columns, condition } = req.query;

  console.log("database:", dbName);
  console.log("table:", tableName);
  console.log("columns:", columns);
  console.log("condition:", condition || "None");

  if (!tableName || !columns) {
      return res.status(400).json({ message: "invalid request: missing required parameters" });
  }

  let connection;
  try {
      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${dbName}\`;`);

      const formattedColumns = columns
          .split(",")
          .map(col => `\`${col.trim()}\``) // Wrap each column name with backticks
          .join(", ");


      let query = `SELECT ${formattedColumns} FROM \`${tableName}\``;
      if (condition) {
          query += ` WHERE ${condition}`;
      }
      query += ";";

      console.log("executing query:", query);

      const [result] = await connection.query(query);

      res.status(200).json({ message: "columns retrieved successfully.", result });
  } catch (error) {
      console.error("error retrieving columns:", error);
      res.status(500).json({ message: "failed to retrieve columns", error });
  } finally {
      if (connection) connection.release();
  }
});



app.post("/delete-column/:dbName", async (req, res) => {
  const { dbName } = req.params;
  const { tableName, columnName } = req.body;


  if (!tableName || !columnName) {
      return res.status(400).json({ message: "Invalid request: Missing required parameters." });
  }

  let connection;
  try {
      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${dbName}\`;`);

      // Ensure the column name is properly escaped
      const formattedColumn = `\`${columnName.trim()}\``;


      const query = `ALTER TABLE \`${tableName}\` DROP COLUMN ${formattedColumn};`;

      console.log("Executing Query:", query);

      await connection.query(query);

      res.status(200).json({ message: `column "${columnName}" deleted successfully from table "${tableName}".` });
  } catch (error) {
      console.error("error deleting column:", error);
      res.status(500).json({ message: "failed to delete column", error });
  } finally {
      if (connection) connection.release();
  }
});



app.post("/add-row/:dbName", async (req, res) => {
  const { dbName } = req.params;
  const { tableName, columns, values } = req.body;

  console.log("database:", dbName);
  console.log("table:", tableName);
  console.log("columns:", columns);
  console.log("values:", values);

  if (!tableName || !Array.isArray(columns) || !Array.isArray(values) || columns.length === 0 || values.length === 0 || columns.length !== values.length) {
      return res.status(400).json({ message: "Invalid request: Column names and values are required and should match in length." });
  }

  let connection;
  try {
      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${dbName}\`;`);

      const formattedColumns = columns.map(col => `\`${col.trim()}\``).join(", ");

      const placeholders = values.map(() => "?").join(", ");

      const query = `INSERT INTO \`${tableName}\` (${formattedColumns}) VALUES (${placeholders});`;

      console.log("Executing Query:", query);

      const [result] = await connection.execute(query, values);

      res.status(200).json({ message: `Row added successfully to "${tableName}".`, result });
  } catch (error) {
      console.error("Error inserting row:", error);
      res.status(500).json({ message: "Failed to add row", error });
  } finally {
      if (connection) connection.release();
  }
});



app.delete("/delete-row/:dbName", async (req, res) => {
  const { dbName } = req.params;
  const { tableName, condition } = req.query;

  console.log("database:", dbName);
  console.log("table:", tableName);
  console.log("condition:", condition);

  if (!tableName || !condition) {
      return res.status(400).json({ message: "Invalid request: Table name and condition are required." });
  }

  let connection;
  try {
      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${dbName}\`;`);

      const query = `DELETE FROM \`${tableName}\` WHERE ${condition};`;

      console.log("Executing Query:", query);

      const [result] = await connection.query(query);

      if (result.affectedRows > 0) {
          res.status(200).json({ message: `Row(s) deleted successfully from "${tableName}".`, result });
      } else {
          res.status(404).json({ message: "No matching rows found to delete." });
      }
  } catch (error) {
      console.error("Error deleting row:", error);
      res.status(500).json({ message: "Failed to delete row", error });
  } finally {
      if (connection) connection.release();
  }
});


app.post("/delete-all-rows/:databaseName", async (req, res) => {
  const { databaseName } = req.params;
  const { tableName, deleteMethod } = req.body;

  if (!tableName || !deleteMethod) {
      return res.status(400).json({ message: "Invalid request: Table name and delete method are required." });
  }

  let connection;
  try {
      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${databaseName}\`;`);

      // Choose between DELETE and TRUNCATE
      let query;
      if (deleteMethod === "DELETE") {
          query = `DELETE FROM \`${tableName}\`;`;
      } else if (deleteMethod === "TRUNCATE") {
          query = `TRUNCATE TABLE \`${tableName}\`;`;
      } else {
          return res.status(400).json({ message: "Invalid delete method. Use 'DELETE' or 'TRUNCATE'." });
      }

      console.log("Executing Query:", query);
      await connection.query(query);

      res.status(200).json({ message: `All rows deleted using ${deleteMethod}.` });
  } catch (error) {
      console.error("Error deleting all rows:", error);
      res.status(500).json({ message: "Failed to delete rows", error });
  } finally {
      if (connection) connection.release();
  }
});





app.post("/add-relation/:databaseName", async (req, res) => {
  const { databaseName } = req.params;
  const { childTable, childColumn, parentTable, parentColumn, constraintName, onDelete, onUpdate } = req.body;

  if (!childTable || !childColumn || !parentTable || !parentColumn) {
      return res.status(400).json({ message: "Missing required fields." });
  }

  const constraint = constraintName ? `CONSTRAINT \`${constraintName}\`` : "";

  const query = `
      ALTER TABLE \`${childTable}\`
      ADD ${constraint} FOREIGN KEY (\`${childColumn}\`)
      REFERENCES \`${parentTable}\`(\`${parentColumn}\`)
      ON DELETE ${onDelete}
      ON UPDATE ${onUpdate};
  `;

  let connection;
  try {
      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${databaseName}\`;`);
      await connection.query(query);

      res.status(200).json({ message: "Foreign key relation added successfully." });
  } catch (error) {
      console.error("Error adding foreign key:", error);
      res.status(500).json({ message: "Failed to add foreign key.", error });
  } finally {
      if (connection) connection.release();
  }
});



app.delete("/delete-relation/:databaseName", async (req, res) => {
  const { databaseName } = req.params;
  const { tableName, foreignKeyName } = req.query;

  console.log("database:", databaseName);
  console.log("table:", tableName);
  console.log("foreign key:", foreignKeyName);

  if (!tableName || !foreignKeyName) {
      return res.status(400).json({ message: "invalid request: Table name and foreign key name are required." });
  }

  let connection;
  try {
      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${databaseName}\`;`);


      const query = `ALTER TABLE \`${tableName}\` DROP FOREIGN KEY \`${foreignKeyName}\`;`;

      console.log("Executing Query:", query);

      const [result] = await connection.query(query);

      if (result.affectedRows > 0) {
          res.status(200).json({ message: `foreign key "${foreignKeyName}" deleted from table "${tableName}".`, result });
      } else {
          res.status(404).json({ message: "foreign key not found or already deleted." });
      }
  } catch (error) {
      console.error("error deleting foreign key:", error);
      res.status(500).json({ message: "failed to delete foreign key", error });
  } finally {
      if (connection) connection.release();
  }
});


app.post("/join-tables/:databaseName", async (req, res) => {
  const { databaseName } = req.params;
  const { tableA, tableB, commonColumn, columns } = req.body;

  console.log("database:", databaseName);
  console.log("table A:", tableA);
  console.log("table B:", tableB);
  console.log("common column:", commonColumn);
  console.log("selected columns:", columns);

  if (!tableA || !tableB || !commonColumn || !columns) {
      return res.status(400).json({ message: "Invalid request: All fields are required." });
  }

  let connection;
  try {
      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${databaseName}\`;`);

      const query = `
          SELECT ${columns}
          FROM \`${tableA}\` A
          JOIN \`${tableB}\` B ON A.\`${commonColumn}\` = B.\`${commonColumn}\`;
      `;

      console.log("Executing Query:", query);

      const [result] = await connection.query(query);

      res.status(200).json({ message: "tables joined successfully!", data: result });
  } catch (error) {
      console.error("error joining tables:", error);
      res.status(500).json({ message: "failed to join tables", error });
  } finally {
      if (connection) connection.release();
  }
});





app.delete("/delete-table/:databaseName", async (req, res) => {
  const { databaseName } = req.params;
  const { tableName } = req.body;

  console.log("database:", databaseName);
  console.log("table to delete:", tableName);

  if (!tableName) {
      return res.status(400).json({ message: "Invalid request: Table name is required." });
  }

  let connection;
  try {
      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${databaseName}\`;`);

      const query = `DROP TABLE \`${tableName}\`;`;

      console.log("Executing Query:", query);

      await connection.query(query);

      res.status(200).json({ message: `table "${tableName}" deleted successfully.` });
  } catch (error) {
      console.error("error deleting table:", error);
      res.status(500).json({ message: "failed to delete table", error });
  } finally {
      if (connection) connection.release();
  }
});



app.get("/show-table/:dbName", async (req, res) => {
  const { dbName } = req.params;
  const { tableName } = req.query;

  console.log("database:", dbName);
  console.log("table:", tableName);

  if (!tableName) {
      return res.status(400).json({ message: "Invalid request: Missing table name." });
  }

  let connection;
  try {
      // Get a connection from the pool
      connection = await defaultPool.getConnection();
      await connection.query(`USE \`${dbName}\`;`);

      // Construct the SELECT * FROM table query
      const query = `SELECT * FROM \`${tableName}\`;`;

      console.log("Executing Query:", query);

      const [result] = await connection.query(query);

      res.status(200).json({ message: "Table data retrieved successfully.", result });
  } catch (error) {
      console.error("error retrieving table data:", error);
      res.status(500).json({ message: "failed to retrieve table data", error });
  } finally {
      if (connection) connection.release();
  }
});























app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${port}`);
});
