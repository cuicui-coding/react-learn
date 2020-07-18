const net = require('net')

// client代表socket示例
const client = new net.Socket()

// 与服务端建立连接
client.connect(8888, 'localhost', () => {
  console.log('connected tp the server')
})
