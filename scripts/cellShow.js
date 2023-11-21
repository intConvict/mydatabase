const fs = require('fs');
const path = require('path');

const cellName = process.argv[2];

// Path to the .mydb file
const dbFilePath = path.join(__dirname, '..', 'database', `${cellName}.mydb`); 

// Check if a table name is provided
if (!cellName) {
  console.error('Please provide a cell name.');
  process.exit(1);
}

// Start with a command
if (fs.existsSync(dbFilePath)){
  console.log(`${cellName}:`);
  console.log(``);

  // Read the content of myTable.mydb
  const dbContent = fs.readFileSync(dbFilePath, 'utf8');
  if (dbContent){
    console.log(dbContent);
  }
  else{
    console.log('this cell is empty')
  }
}
else{
  console.log("this cell doesn't exist")
}
