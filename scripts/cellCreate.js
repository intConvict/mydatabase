const fs = require('fs');
const path = require('path');

// Directory path for the database folder
const packageDirectory = path.join(__dirname, '..', 'database');
const scriptDirectory = path.join(__dirname, '..', 'scripts', 'cells');
// Process command line arguments
const cellName = process.argv[2];

// Check if the databases folder exists, create it if not
if (!fs.existsSync(packageDirectory)) {
  fs.mkdirSync(packageDirectory);
}

if (!fs.existsSync(scriptDirectory)) {
  fs.mkdirSync(scriptDirectory);
}


// Check if a table name is provided
if (!cellName) {
  console.error('Please provide a table name.');
  process.exit(1);
}

//make table
const cellFile = path.join(packageDirectory, `${cellName}.mydb`);

// Check if the table file already exists
if (fs.existsSync(cellFile)) {
  console.error(`${cellName} already exists.`);
  process.exit(1);
}

// Create the table file
fs.writeFile(cellFile, '', (err) => {
  if (err) {
    console.error(`Error creating the cell: ${err}`);
    process.exit(1);
  }
  //add id key
  const keyValuePair = 'id:1';
  fs.appendFileSync(cellFile, keyValuePair);
  console.log(`${cellName} was successfully created.`);
});
