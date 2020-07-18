const net = require('net')

const server = net.createServer((socket) => {
  console.log('client connected')

  server.maxConnections = 2 // 最多允许两个客服端链接我这台server

  server.getConnections((error, count) => {
    // 异步获取服务器上的并发连接数
    console.log('client count:' + count)
  })
})

server.listen(8888, () => {
  console.log('server is listening')
})
