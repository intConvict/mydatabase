const fs = require('fs');
const path = require('path');

// Directory path for the database folder
const packageDirectory = path.join(__dirname, '..', 'database');

// Check if the databases folder exists, create it if not
if (!fs.existsSync(packageDirectory)) {
  fs.mkdirSync(packageDirectory);
}

// Process command line arguments
const tableName = process.argv[2];

// Check if a table name is provided
if (!tableName) {
  console.error('Please provide a table name.');
  process.exit(1);
}

//make table
const tableFile = path.join(packageDirectory, `${tableName}.mydb`);

// Check if the table file already exists
if (fs.existsSync(tableFile)) {
  console.error(`${tableName} already exists.`);
  process.exit(1);
}

// Create the table file
fs.writeFile(tableFile, '', (err) => {
  if (err) {
    console.error(`Error creating the table: ${err}`);
    process.exit(1);
  }
  console.log(`${tableName} was successfully created.`);
});
