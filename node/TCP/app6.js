const net = require('net')

const server = net.createServer((socket) => {
  const address = socket.address()
  const message = 'server adress is ' + JSON.stringify(address)

  // 待写入客户端的数据
  socket.write(message, () => {
    const writeSize = socket.bytesWritten
    console.log(message)
    console.log('message size is ' + writeSize)
  })
  
  // 监听客户端发送过来的数据
  socket.on('data', (data) => {
    console.log(data.toString())

    // bytesRead是socket诞生那一刻到现在总的字节数
    const readSize = socket.bytesRead
    console.log('data size is ' + readSize)
  })
})
server.listen(8888, () => {
  console.log('server is listening')
})
