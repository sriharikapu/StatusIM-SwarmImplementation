const SwarmAPI = require('swarm-api');
const swarmapi = new SwarmAPI({ gateway: 'http://13.231.185.9:8500' });
const fs = require('fs');
fs.readFile('./index.html', (err, data) => {
  if (err) throw err;
  swarmapi.uploadRaw(data, (err, hash) => {
    if (err) return console.error('Error uploading file contents', err);
    console.log(`file contents can now be accessed from 'http://13.231.185.9:8500/bzz-raw:/${hash}'`);
  });
});
