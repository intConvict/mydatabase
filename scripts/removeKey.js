const fs = require('fs');
const path = require('path');

const [, , cell, keyName] = process.argv;

// Path to the .mydb file
const dbFilePath = path.join(__dirname, '..', 'database', `${cell}.mydb`); 

// Check if the required arguments are provided
if (!cell) {
  //no cell
  console.log('Please provide both the cell and key name.');
  console.log('npm run remove-key <cell> <keyName>');
  process.exit(1);
}
else if(!fs.existsSync(dbFilePath)){
  //invalid cell
  console.log('Please provide a valid cell name.');
  console.log('npm run remove-key <cell> <keyName>');
  process.exit(1);
}
else if (!keyName) {
  //no keyname
  console.log('Please provide the key name.');
  console.log('npm run remove-key <cell> <keyName>');
  process.exit(1);
}
else {
  // Read the contents of the file
  const fileContent = fs.readFileSync(dbFilePath, 'utf8');

  // Check if the key name exists
  if (fileContent.includes(`${keyName}:`)) {

    // Remove the key name from the file content
    const updatedContent = fileContent.replace(
      new RegExp(`\\b${keyName}:.*?(?:,|$)`, 'g'),
      ''
    );

    // Remove empty lines from the updated content
    const contentWithoutEmptyLines = updatedContent
      .split('\n')
      .filter(Boolean)
      .join('\n');

    // Remove the last comma if present
    const finalContent =
      contentWithoutEmptyLines.trim().endsWith(',') ?
      contentWithoutEmptyLines.slice(0, -1).trim() :
      contentWithoutEmptyLines;
    
    fs.writeFileSync(dbFilePath, finalContent);
    console.log('Key removed!');
  } 
  else {
    //keyname doesn't exist
    console.log(`${keyName} does not exist in the file.`);
  }
}
