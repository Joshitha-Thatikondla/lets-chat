const firebaseConfig = {
    apiKey: "AIzaSyD3eNFHST76Ut3GRsZE69v6i3ckVE3wHGM",
    authDomain: "lets-chat-web-app-3906d.firebaseapp.com",
    projectId: "lets-chat-web-app-3906d",
    databaseURL: "https://lets-chat-web-app-3906d-default-rtdb.firebaseio.com",
    storageBucket: "lets-chat-web-app-3906d.appspot.com",
    messagingSenderId: "17241296642",
    appId: "1:17241296642:web:ff9b46a11a1a450940fc1b",
    measurementId: "G-FX0VSMBD7L"
  };

  firebase.initializeApp(firebaseConfig);

  Username = localStorage.getItem("user_name");
document.getElementById("userName").innerHTML = "Welcome " + Username + " to Kwitter Chat App";

function add_Room() {
      roomNAME = document.getElementById("roomname").value;
      firebase.database().ref("/").child(roomNAME).update({
            purpose:"adding roomname"
      });
      
      localStorage.setItem("Your_Room",roomNAME);
      window.location = "kwitterChat.html";
}

function getData() 
{firebase.database().ref("/").on('value', 
function(snapshot)
{
      document.getElementById("roomNamesOutput").innerHTML = "";
      snapshot.forEach(function(childSnapshot) 
 {
      childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room name:- "+Room_names);
      room = "<div class = 'room_name' id= " + Room_names + "onclick = 'redirect(this.id)'>" + Room_names + "</div><hr>"
      document.getElementById("roomNamesOutput").innerHTML += room
      //End code
 });
});
}
getData();

function redirect(name) {
      localStorage.setItem("room_name", name);
      window.location = "kwitterChat.html";
}

function logout() {
      window.location = "kwitter.html";
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
}
