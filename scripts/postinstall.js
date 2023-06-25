const fs = require('fs');
const path = require('path');

// Directory path for your package's folder
const packageDirectory = path.join(__dirname, '..', 'database');

// Create the package folder if it doesn't exist
if (!fs.existsSync(packageDirectory)) {
  fs.mkdirSync(packageDirectory);
}
