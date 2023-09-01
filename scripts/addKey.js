const fs = require('fs');
const path = require('path');

const [, , cell, keyName] = process.argv;

// Path to the .mydb file
const dbFilePath = path.join(__dirname, '..', 'database', `${cell}.mydb`); 

// Check if the required arguments are provided
if (!cell) {
  //no cell
  console.log('Please provide both the cell and key name.');
  console.log('npm run add-key <cell> <keyName>');
  process.exit(1);
}
else if(!fs.existsSync(dbFilePath)){
  //invalid cell
  console.log('Please provide a valid cell name.');
  console.log('npm run add-key <cell> <keyName>');
  process.exit(1);
}
else if (!keyName) {
  //no keyname
  console.log('Please provide the key name.');
  console.log('npm run add-key <cell> <keyName>');
  process.exit(1);
}
else {
  // Read the contents of the file
  const fileContent = fs.readFileSync(dbFilePath, 'utf8');

  // Check if the key name already exists
  if (fileContent.includes(`${keyName}:`)) {
    console.log(`${keyName} already exists in the file.`);
  } 
  else {
    //keyname is available
    const keyValuePair = fileContent ? `,\n${keyName}:` : `${keyName}:`;
    fs.appendFileSync(dbFilePath, keyValuePair);
    console.log('Key added!');
  }
}
