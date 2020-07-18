const dgram = require('dgram')

const message = Buffer.from('This message comes from server')

// listener监听客户端的发过来的消息
const socket = dgram.createSocket('udp4', (msg, info)=>{

  // 向客户端发送消息
  socket.send(message, 0, message.length, info.port, info.address, (error, bytes)=>{
    if(error){
      console.log(error)
      return;
    }
    console.log('Server has sent '+ bytes + 'bytes message');
  })
})

socket.bind(9999, 'localhost', ()=>{
  console.log('Server has binded to 9999')
})

// 接受客户端消息
socket.on('message', (msg,info)=>{
  console.log('message event occured')
  console.log(msg.toString())
})