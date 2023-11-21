const fs = require('fs');
const path = require('path');
let fileContent;

const [, , cell, keyName, id, value] = process.argv;

// Path to the mydb file
const dbFilePath = path.join(__dirname, '..', 'database', `${cell}.mydb`);

if(cell){
  fileContent = fs.readFileSync(dbFilePath, 'utf8');
}

if (!cell) {
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
else if (!keyName) {
  // No keyname
  console.log('Please provide a key name.');
  console.log('npm run set-value <cell> <keyName> <id> <value>');
  process.exit(1);
}
else if (!fileContent.includes(`${keyName}:`)) {
  // Invalid keyname
  console.log('Please provide a valid key name.');
  console.log('npm run set-value <cell> <keyName> <id> <value>');
  process.exit(1);
}
else if (!id) {
  // No id
  console.log('Please provide an id.');
  console.log('npm run set-value <cell> <keyName> <id> <value>');
  process.exit(1);
}
else if (!fileContent.includes(`id:${id},`)) {
  // Invalid id
  console.log('Please provide a valid id.');
  console.log('npm run set-value <cell> <keyName> <id> <value>');
  process.exit(1);
}
else if (!value) {
  // No value
  console.log('Please provide a value.');
  console.log('npm run set-value <cell> <keyName> <id> <value>');
  process.exit(1);
}
else {
  function containsInvalidCharacters(str) {
    return /[:|,]/.test(str);
  }

  if(!containsInvalidCharacters(value)){
    // Update the key value
    const records = fileContent.split('|');
    const updatedRecords = records.map(record => {
      if (record.includes(`id:${id},`)) {
        if(record.endsWith('\n')){
          return record.replace(new RegExp(`(${keyName}:)[^,]*,?`, 'g'), (match, p1) => {
            return match.endsWith(',') ? `${p1}${value},` : `${p1}${value}\n`;
          });
        }
        return record.replace(new RegExp(`(${keyName}:)[^,]*`, 'g'), `$1${value}`);
      }
      return record;
    });

    const updatedContent = updatedRecords.join('|');
  
    fs.writeFileSync(dbFilePath, updatedContent);
    console.log('Value set!');
    
  } else {
    console.log('Your value contains banned characters either: ":", "," or "|"')
  }

}
