const net = require('net')

const server = new net.Server();

server.on('connection', (socket)=>{
  console.log('client connected')
})

server.listen(8888);
 
server.on('listening', ()=>{
  console.log('server is listening')
})

server.on('close', ()=>{
  console.log('server closed')
})

server.on('error', (error)=>{
  console.log('server error')
})