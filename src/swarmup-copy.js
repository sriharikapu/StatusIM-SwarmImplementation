const swarmgw = require('swarmgw')(/* opts */)

// This should output the hash: 931cc5a6bd57724ffd1adefc0ea6b4f0235497fca9e4f9ae4029476bcb51a8c6
swarmgw.put( "SwarmUP.js" , function (err, ret) {
  if (err) {
    console.log('Failed to upload: ' + err)
  } else {
    console.log('Swarm hash: ' + ret)
  }
})
