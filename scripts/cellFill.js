const fs = require('fs');
const path = require('path');
const readline = require('readline')
let fileContent;

// Create an interface for readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cellName = process.argv[2];

// Path to the mydb file
const dbFilePath = path.join(__dirname, '..', 'database', `${cellName}.mydb`);

if(cellName){
  fileContent = fs.readFileSync(dbFilePath, 'utf8');
}

if (!cellName) {
  // No cell
  console.log('Please provide both the cell and key name.');
  console.log('npm run set-value <cell> <keyName> <id> <value>');
  process.exit(1);
}
else if(!fs.existsSync(dbFilePath)){
  // Invalid cell
  console.log('Please provide a valid cell name.');
  console.log('npm run set-value <cell> <keyName> <id> <value>');
  process.exit(1);
}
else {
  // Function to generate a random string of 10 letters
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }  
  // Ask for confirmation
  rl.question('Do you want to override existing values? (y/N) ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      // Regular expression to match key-value pairs except for id
      const regex = /(\b(?!id\b)\w+):[^,|\n]*?(?=(,|\n|\||$))/g;
    
      // Replace each match with the key and a new random string
      const updatedContent = fileContent.replace(regex, (match, key) => `${key}:${generateRandomString(50)}`);
    
      // Write the updated content back to the file
      fs.writeFileSync(dbFilePath, updatedContent);
      console.log('Cell filled!');
    } else {
      // Regular expression to match empty key-value pairs except for id
      const regex = /(\b(?!id\b)\w+):(?=(,|\n|\||$))/g;
      
      // Replace each match with the key and a new random string
      const updatedContent = fileContent.replace(regex, (match, key) => `${key}:${generateRandomString(50)}`);
      
      // Write the updated content back to the file
      fs.writeFileSync(dbFilePath, updatedContent);
      console.log('Cell filled!');
    }
  
    rl.close();
  });
}
