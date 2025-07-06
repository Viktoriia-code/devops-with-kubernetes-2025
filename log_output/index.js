const { v4: uuidv4 } = require('uuid');

const storedString = uuidv4();

function logWithTimestamp() {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${storedString}`);
}

setInterval(logWithTimestamp, 5000);
