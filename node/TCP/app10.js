const net = require('net')

// client代表socket示例
const client = new net.Socket()

// 与服务端建立连接
client.connect(8888, 'localhost', () => {
  console.log('connected to the server')
  client.write('message from client')
})

// 监听服务器端发送过来的数据
client.on('data', (data) => {
  console.log('data from server:' + data.toString())
  client.write('hello world')
})

client.on('end', () => {
  console.log('end event')
})
