const dragm = require('dgram')

const message = Buffer.from('This is ')

const socket = dragm.createSocket('udp4')

socket.send(message, 0, message.length, 9999, 'localhost', (error, bytes)=>{
  if(error){
    console.log(error);
    return;
  }
  console.log('client has sent ' + bytes + 'bytes message' )
})

socket.on('message', (msg, info)=>{
  const message2Send = 'hello world';
  socket.send(message2Send,0, message2Send.length, 9999, 'localhost')
})