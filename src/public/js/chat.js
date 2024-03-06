let myUserName = "";
const socket = io();

const username = document.getElementById("userName");
const message = document.getElementById("message");
const messageLog = document.getElementById("messagesLog");

socket.on("chatMessages", ({ messages }) => {
  messageLog.innerHTML = "";
  messages.forEach((message) => {
    messageLog.innerHTML += `${message.user}: ${message.message}<br/>`;
  });
});

message.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    socket.emit("newMessage", {
      user: myUserName,
      message: e.target.value,
    });
    e.target.value = "";
  }
});

Swal.fire({
  title: "Login",
  text: "Please enter your username to continue.",
  input: "email",
  allowOutsideClick: false,
}).then((result) => {
  myUserName = result.value;
  username.innerHTML = myUserName;
});
