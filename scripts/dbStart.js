const fs = require('fs');
const path = require('path');

// Directory path for your package's folder
const packageDirectory = path.join(__dirname, '..', 'database');

// Create the package folder if it doesn't exist
if (!fs.existsSync(packageDirectory)) {
  fs.mkdirSync(packageDirectory);
  const cautionFile = path.join(packageDirectory, `.caution`);
  const cautionMessage = 'CAUTION: Do not modify the contents of any files in this folder unless you are absolutely certain of the consequences.\nModifying these files without proper understanding may lead to unexpected behavior or system instability.\n\nIf you need to make changes, consult with the documentation or seek assistance from the project maintainer.';
  fs.appendFileSync(cautionFile, cautionMessage);
  console.log('Your database is ready for use')
} else {
  console.log('Your database is already set up')
}
