const fs = require('fs');
const path = require('path');

// Path to the .mydb file
const dbFolderPath = path.join(__dirname, '..', 'database');

fs.readdir(dbFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading the directory:', err);
    return;
  }
  
  const cellNames = files
    .filter(file => file.endsWith('.mydb'))
    .map(file => file.replace('.mydb', ''));
    
  if(cellNames.length > 0){
    console.log('You have these cells:', cellNames);
  } else {
    console.log('You have no cells');
  }
});
