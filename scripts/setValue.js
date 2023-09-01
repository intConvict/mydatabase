const fs = require('fs');
const path = require('path');
let fileContent;

const [, , cell, keyName, value] = process.argv;

// Path to the mydb file
const dbFilePath = path.join(__dirname, '..', 'database', `${cell}.mydb`);

if(cell){
  fileContent = fs.readFileSync(dbFilePath, 'utf8');
}

if (!cell) {
  //no cell
  console.log('Please provide both the cell and key name.');
  console.log('npm run add-value <cell> <keyName> <value>');
  process.exit(1);
}
else if(!fs.existsSync(dbFilePath)){
  //invalid cell
  console.log('Please provide a valid cell name.');
  console.log('npm run add-value <cell> <keyName> <value>');
  process.exit(1);
}
else if (!keyName) {
  //no keyname
  console.log('Please provide the key name.');
  console.log('npm run add-value <cell> <keyName> <value>');
  process.exit(1);
}
else if (!fileContent.includes(`${keyName}:`)) {
  //invaid keyname
  console.log('Please provide a valid key name.');
  console.log('npm run add-value <cell> <keyName> <value>');
  process.exit(1);
}
else if (!value) {
  //invaid keyname
  console.log('Please provide a value.');
  console.log('npm run add-value <cell> <keyName> <value>');
  process.exit(1);
}
else {

  // Update the key value
  const updatedContent = fileContent.replace(
    new RegExp(`${keyName}:[^,]*`, 'g'),
    `${keyName}:${value}`
  );

  fs.writeFileSync(dbFilePath, updatedContent);
  console.log('Value set!');
}
