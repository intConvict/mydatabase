const fs = require('fs');
const path = require('path');

const tableName = process.argv[2];

// Path to the .mydb file
const dbFilePath = path.join(__dirname, '..', 'database', `${tableName}.mydb`); 

// Start with a command
if (fs.existsSync(dbFilePath)){
  console.log(`${tableName}:`);

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
