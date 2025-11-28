const crypto = require('crypto');

const token = crypto.randomBytes(32).toString('hex');
console.log(`Generated Token: ${token}`);
console.log(`\nAdd this to your .env file:`);
console.log(`AUTH_TOKEN=${token}`);
