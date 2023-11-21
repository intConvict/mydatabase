const fs = require('fs');
const path = require('path');

// Path to the .mydb file
const dbFolderPath = path.join(__dirname, '..', 'database');

// Function to empty all files in a directory
function emptyFilesInDirectory(directory) {
  // Read all files in the directory
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading the directory:', err);
      return;
    }

    // Loop through each file and empty its contents
    files.forEach(file => {
      const filePath = path.join(directory, file);

      // Write an empty string to the file
      fs.writeFileSync(filePath, 'id:1');
      console.log(`Emptied file: ${file}`);
    });
  });
}

// Empty every file in the directory
emptyFilesInDirectory(dbFolderPath);
