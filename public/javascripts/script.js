var socket = io();
var nam = document.querySelector("#nam");
var sub_nam = document.querySelector("#sub-nam");
var form_nam =document.querySelector("#form-nam")
const element = document.querySelector(".box1");
// const axios = require('axios')
// for load time
window.onload = function() {
nam.focus();

}


// clutter online
socket.on("nam",(data)=>{
      let clutter="";
      let onlineUser=0;
      onlineUser = data.data.length;
      // console.log(data);
      // console.log(data.data.length);
    data.data.forEach(function(elem){
      // console.log(elem);
      clutter+=`<div class="activeUser">
    <p><span id="greenCircle">🟢</span> ${elem} </p>
  </div>`
    })
    // console.log(clutter);
    document.querySelector("#onlineNUm").innerHTML=onlineUser
    document.querySelector(".nameOnlineUser").innerHTML=clutter;
    })

// for close overlay

sub_nam.addEventListener("click",function(dets){
if(nam.value!=="")
{ 
  document.querySelector(".overlay").style.display="none";
  dets.preventDefault();
  socket.emit("nam",nam.value)
  socket.emit("loginName",nam.value)
  document.querySelector("#textarea").focus();
}
})






// for name taking 
  
    // for send message button
 document.querySelector("#send").addEventListener("click",function(){
    // scrollToBottom();
     if(document.querySelector("#textarea").value!==""){
    socket.emit("msg",document.querySelector("#textarea").value)
    socket.emit("leftmsg",document.querySelector("#textarea").value)
  }

});
let countTag=0,i=0;;
  //  for taking message and show

  socket.on("msg",function(data){     
   
        document.querySelector(".box1 .messages").innerHTML +=`<div class="msgright ">
              <h7>${data.name} : </h7>
              <p>${data.msg}</p>
            </div>
            <br>`
     
    document.querySelector("#textarea").value=""           
    scrollToBottom()
    
    })

    // online user div
    var on=0;
    document.querySelector(".numOnline").addEventListener("click",function(){
      // console.log("click");
      if(on==0)
     { 
      on=1;
      document.querySelector(".nameOnlineUser").style.opacity="1";
    }
    else{
      on=0;
      document.querySelector(".nameOnlineUser").style.opacity="0";
    }
     
    })

    // add msg to left side
    socket.on("leftmsg",(leftmsg)=>{
      document.querySelector(".box1 .messages").innerHTML +=`<div class="msgleft">
         <h7>${leftmsg.name} : </h7>
        <p>${leftmsg.msg} </p>
       </div>
       <br>`
    })


    // for typing

    document.querySelector("#textarea").addEventListener("input",function(){
      socket.emit("typing","ashish")

      socket.on("typing",(data)=>{
        // console.log(data);
        document.querySelector(".typing").style.opacity="1";
        document.querySelector("#typingName").innerHTML=data;
        setTimeout(function(){
          document.querySelector(".typing").style.opacity="0";
          document.querySelector("#typingName").innerHTML="";
        },1500)
      })
      // console.log("typing...");
    })



// Add an event listener to the "Upload" button
document.querySelector("#imgsubmit").addEventListener("click", function () {
  const fileInput = document.querySelector("#uploads");
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("image", file);

    // Use fetch to upload the image without reloading the page
    fetch("/photo", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        if (data) {
          // Image upload was successful
          console.log(data);
          console.log("Image uploaded successfully");
          socket.emit('image', data.imgUrl); // Emit the image URL
        } else {
          console.error("Image upload failed");
        }
      })
      .catch((error) => {
        console.error("Image upload failed", error);
      });
  }
});

// Handle the "image" event to display images
socket.on("photourl", (photo) => {
  const messagesContainer = document.querySelector(".box1 .messages");

  // Create an image element and set the source to the received image URL
  const img = document.createElement("img");
  img.src = photo.imgUrl;

  // Create a container for the image
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("msgright");
  imageContainer.appendChild(img);

  // Append the image container to the messages container
  messagesContainer.appendChild(imageContainer);

  // Append a line break for a new message
  messagesContainer.appendChild(document.createElement("br"));

  // Clear the textarea and scroll to the bottom
  document.querySelector("#textarea").value = "";
  scrollToBottom();
});


socket.on("image", (photo) => {
  const messagesContainer = document.querySelector(".box1 .messages");

  // Create an image element and set the source to the received image URL
  const img = document.createElement("img");
  img.src = photo.imgUrl;

  // Create a container for the image
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("msgleft");
  imageContainer.appendChild(img);

  // Append the image container to the messages container
  messagesContainer.appendChild(imageContainer);

  // Append a line break for a new message
  messagesContainer.appendChild(document.createElement("br"));

  // Clear the textarea and scroll to the bottom
  document.querySelector("#textarea").value = "";
  scrollToBottom();
});





    // scroll
function scrollToBottom(){
element.scrollTop = element.scrollHeight;
}


