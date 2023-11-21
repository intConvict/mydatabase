const fs = require('fs');
const path = require('path');

const [, , cell] = process.argv;

// Path to the .mydb file
const dbFilePath = path.join(__dirname, '..', 'database', `${cell}.mydb`);

// Check if the required arguments are provided
if (!cell) {
  // No cell provided
  console.log('Please provide the cell name.');
  console.log('npm run add-row <cell>');
  process.exit(1);
} else if (!fs.existsSync(dbFilePath)) {
  // Invalid cell
  console.log('Please provide a valid cell name.');
  console.log('npm run add-row <cell>');
  process.exit(1);
} else {
  let fileContent = fs.readFileSync(dbFilePath, 'utf8');
  // Modify the file content and reassign it back to fileContent
  fileContent = fileContent.replace(/\n\|[^|]*$/, '');
  // To see the result in the console
  console.log('Removed latest row:', fileContent);
  // If you want to save the changes back to the file
  fs.writeFileSync(dbFilePath, fileContent, 'utf8');
}
