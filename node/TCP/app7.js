const net = require('net')

const server = net.createServer((socket) => {
  // local表示本地
  console.log('local port: ' + socket.localPort)
  console.log('local address: ' + socket.localAddress)
  
  // remote表示对端
  console.log('remote port: ' + socket.remotePort)
  console.log('remote family: ' + socket.remoteFamily)
  console.log('remote address: ' + socket.remoteAddress)
})

server.listen(8888, () => {
  console.log('server is listening')
})
