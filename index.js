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

function showComplaintPanel(){
  document.getElementById("leave_application").style.display = "none";
  document.getElementById("addComplaint").style.display = "block";
}

function showLeavePanel(){
  document.getElementById("leave_application").style.display = "block";
  document.getElementById("addComplaint").style.display = "none";
}

function returnDateReq(){
  document.getElementById("return_day").style.display = "block";
  document.getElementById("returnLabel").style.display = "block";
}

function noReturnDateReq(){
    document.getElementById("return_day").style.display = "none";
    document.getElementById("returnLabel").style.display = "none";
}

function submitLeaveRequest(){
  var leaveRb = document.getElementById("leave_pass");
  var nightRb = document.getElementById("night_pass");

  if(leaveRb.checked){
    var name = document.getElementById("name_field").value;
    var RegNo = document.getElementById("regno_field").value;
    var branch;
    if(document.getElementById("comp").checked){
      branch = "comp";
    }else if(document.getElementById("IT").checked){
      branch = "IT";
    }else if(document.getElementById("Mech").checked){
      branch = "Mech";
    }else if(document.getElementById("E&TC").checked){
      branch = "E&TC";
    }
    var mob = document.getElementById("mobile_field").value;
    var Fmob = document.getElementById("LGmobile_field").value;
    var fromDate = document.getElementById("leaving_day").value;
    var toDate = document.getElementById("return_day").value;
    var Uaddress = document.getElementById("address").value;

    console.log(name+" "+RegNo+" "+branch+" "+mob+" "+Fmob+" "+fromDate+" "+toDate+" "+Uaddress);
    if(Fmob === "" || fromDate === "" || toDate === "" || Uaddress === "" || branch == null){
        
    }else{

    }

  }else if(nightRb.checked){

  }
}
function logout(){
  firebase.auth().signOut();
}

//Amitav your attention here
function verify(){

}
