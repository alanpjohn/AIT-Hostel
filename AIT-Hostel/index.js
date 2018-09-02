firebase.auth().onAuthStateChanged(function(user) {
  document.getElementById("leave_application").style.display = "none";
  document.getElementById("addComplaint").style.display = "none";

  if (user) {

    // User is signed in.
    var d = new Date();
    var h = d.getHours();
    console.log(h);
    if(h >= 4 && h <12){
      document.getElementById("greeting").innerHTML="Good Morning";
    }else if(h >= 12 && h <16){
      document.getElementById("greeting").innerHTML="Good Afternoon";
    }else{
      document.getElementById("greeting").innerHTML="Good Evening";
    }
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("nav").style.display = "block";
    document.getElementById("word").style.display = "block";
    document.getElementById("notice").style.display = "none";



    var user = firebase.auth().currentUser;
    var firebasedb = firebase.database();
    if(user != null){

      var email_id = user.email;
      var uid = user.uid;
      //writeUserData(uid,"Alan",email_id);
     firebasedb.ref(`/users/`+uid).on("value", function(snapshot) {
        console.log(snapshot.val());
        var name = snapshot.val().username;
        var cat = snapshot.val().category;
      document.getElementById("user_para").innerHTML = "Hi, " + name;
      if(cat == "warden"){
        window.open("warden.html" , "_self");
      }

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });


    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("nav").style.display = "none";
    document.getElementById("word").style.display = "none";
    document.getElementById("notice").style.display = "block";
    document.getElementById("greeting").innerHTML="Login";

  }
});

function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,

  });
}

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}


//Amitav your attention here
function verify(){


}
