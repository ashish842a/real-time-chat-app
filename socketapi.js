var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

let connectedUser=[];
let connectedId=[];

io.on('connection', function(socket){
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected'); 
   
        let index = connectedId.indexOf(socket.id);
        // console.log(index);
      
        connectedId.splice(index,1);
        connectedUser.splice(index,1);
        console.log(connectedId);
        console.log(connectedUser);

        

      });

  // for name
      socket.on("nam",(nam)=>{
       
        connectedId.push(socket.id)
        connectedUser.push(nam)
        console.log(connectedId);
        console.log(connectedUser);
        io.emit("nam",{data:connectedUser});
      })
      // loginNam
      socket.on("loginName",(name)=>{
        // console.log(name);
        io.emit("loginName",name)
      })

      //for message
    socket.on('msg', (msg) => {
      let connectionkanaam = connectedUser[connectedId.indexOf(socket.id)];
        // console.log('message: ' + msg);
        socket.emit("msg", { name: connectionkanaam, msg: msg });
      });

      socket.on('leftmsg', (msg) => {
        let connectionkanaam = connectedUser[connectedId.indexOf(socket.id)];
          // console.log('message: ' + msg);
          socket.broadcast.emit("leftmsg", { name: connectionkanaam, msg: msg });
        });

    socket.on("typing",(data)=>{
      let user = connectedUser[connectedId.indexOf(socket.id)];
      socket.broadcast.emit("typing",user)
      // socket.broadcast.emit("typing", "world");
    })


    // display image in chat

   // Add an event listener for the "image" event
socket.on("image", function (data) {

  console.log("socte side",data);
  socket.emit("photourl", { imgUrl: data });
  socket.broadcast.emit("image", { imgUrl: data });

  // socket.emit("photourl", { imgUrl: "https://images.unsplash.com/photo-1697936331208-f6aa8fb15b88?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" });

  // socket.broadcast.emit("image", { imgUrl: "https://images.unsplash.com/photo-1697936331208-f6aa8fb15b88?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" });

});

    
    
      // end of connection
});

socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;