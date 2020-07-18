const net = require('net')

// 等待客户连接，一旦连接建立，就会触发回调
const server = net.createServer((socket) => {

  // 监听客户端发送的数据
  socket.on('data', (data) => {
    console.log(data.toString())
  })
})

server.listen(8888, () => {
  console.log('server is listening')
})
