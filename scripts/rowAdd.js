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
  // Read the contents of the file
  let fileContent = fs.readFileSync(dbFilePath, 'utf8');
  let updatedContent;

  if (fileContent.includes('|')) {
    const separatorIndex = fileContent.indexOf('|');
    updatedContent = fileContent.slice(0, separatorIndex);
  } else {
    updatedContent = fileContent;
  }

  // Extract keys from the file content
  let keys = updatedContent
    .split('\n')
    .map(line => line.trim().split(':')[0])
    .filter(Boolean)
    .join(':,\n') + ':';

  updatedContent = fileContent + '\n|\n' + keys;

  // Find all indexes of "id:"
  const searchString = 'id:';
  const indexes = [];

  let currentIndex = updatedContent.indexOf(searchString);
  while (currentIndex !== -1) {
    indexes.push(currentIndex);
    currentIndex = updatedContent.indexOf(searchString, currentIndex + 1);
  }
  const latestIndexes = indexes.slice(-2);

  // Read characters after "id:" until a comma
  const idValues = latestIndexes.map(index => {
    const start = index + searchString.length;
    const end = updatedContent.indexOf(',', start);
    return updatedContent.slice(start, end);
  });
  const latestIdValues = idValues.slice(-2);

  // Increment the latest ID value
  const latestId = parseInt(latestIdValues[1]);
  const nextId = isNaN(latestId) ? parseInt(latestIdValues[0]) + 1 : latestId + 1;

  console.log('Next ID value:', nextId);

  // Replace the latest ID value with the nextId in the updatedContent
  const indexToReplace = latestIndexes[1] + searchString.length;
  const updatedIdContent =
    updatedContent.slice(0, indexToReplace) + nextId + updatedContent.slice(indexToReplace);

  fs.writeFileSync(dbFilePath, updatedIdContent);
}
