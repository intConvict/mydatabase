const fs = require('fs');
const path = require('path');
const readline = require('readline')

// Create an interface for readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Directory path for the database folder
const packageDirectory = path.join(__dirname, '..', 'database');
const scriptDirectory = path.join(__dirname, '..', 'scripts', 'cells');

if (!fs.existsSync(packageDirectory)) {
  fs.mkdirSync(packageDirectory);
}

if (!fs.existsSync(scriptDirectory)) {
  fs.mkdirSync(scriptDirectory);
}

// Process command line arguments
const cellName = process.argv[2];

// Check if a table name is provided
if (!cellName) {
  console.error('Please provide a cell name.');
  process.exit(1);
}

// Ask for confirmation
rl.question('Are you sure you want to destroy this cell? (y/N) ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    // User confirmed, delete the directory
    try {
      // Find table
      const cellFile = path.join(packageDirectory, `${cellName}.mydb`);
      if (fs.existsSync(cellFile)) {
        fs.unlinkSync(cellFile);
        console.log(`${cellName} was successfully destroyed.`);
      } else {
        console.log(`${cellName} was not found`);
      }
    } catch (err) {
      console.error('Error while deleting directory:', err);
    }
  } else {
    // User did not confirm, do not delete
    console.log('Cell deletion cancelled');
  }

  rl.close();
});
