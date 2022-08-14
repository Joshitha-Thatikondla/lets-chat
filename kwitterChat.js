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
Roomname = localStorage.getItem("Your_Room");

function send()
{
 message = document.getElementById("msg").value;
 firebase.database().ref(Roomname).push({
    Name:Username,
    Message:message,
    Like:0
 });

 document.getElementById("msg").value = " ";
};

function getData() 
{ 
  firebase.database().ref("/"+Roomname).on('value', function(snapshot) 
  { 
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) 
   {
      childKey  = childSnapshot.key; 
      childData = childSnapshot.val(); 
      if(childKey != "purpose")
       {
         firebase_message_id = childKey;
         message_data = childData;
  //Start code
         console.log(firebase_message_id);
	     console.log(message_data);
	     name = message_data['Name'];
	     message = message_data['Message'];
         like = message_data['Like'];
         
         name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = name_with_tag + message_with_tag +like_button + span_with_tag;       
        document.getElementById("output").innerHTML += row; 
//End code
      } });  }); }
getData();

function updateLike(msg_id){
    button_id = msg_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(Roomname).child(msg_id).update({
		Like : updated_likes  
	 });
    
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("Your_Room");
    window.location.replace("kwitter.html");
 }