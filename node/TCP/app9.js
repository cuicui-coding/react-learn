const net = require('net')
const client = new net.Socket()

client.connect(8888, 'localhost', () => {
  console.log('connected to server')
})

client.on('data', (data) => {
  console.log('data:' + data.toString())
})
