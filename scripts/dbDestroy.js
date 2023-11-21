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

// Ask for confirmation
rl.question('Are you sure you want to destroy? (y/N) ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    // User confirmed, delete the directory
    try {
      fs.rmSync(packageDirectory, { recursive: true, force: true });
      console.log('Directory deleted successfully');
    } catch (err) {
      console.error('Error while deleting directory:', err);
    }
  } else {
    // User did not confirm, do not delete
    console.log('Directory deletion cancelled');
  }

  rl.close();
});