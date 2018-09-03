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
        var name = snapshot.val().name;
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
  var firebasedb = firebase.database();
  firebase.database().ref('users/' + userId).set({
    name: "Alan P John",
    email: email,
    category:"warden",
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
  var d = new Date();
  var user = firebase.auth().currentUser;
  var userId = user.uid;
  var firebasedb = firebase.database();
  firebasedb.ref(`/users/`+userId).on("value", function(snapshot) {
     console.log(snapshot.val());
     var name = snapshot.val().name;
     var branch = snapshot.val().branch;
     var regno = snapshot.val().regno;
     var mob = snapshot.val().mobile;
     var leaveRb = document.getElementById("leave_pass");
     var nightRb = document.getElementById("night_pass");

     if(leaveRb.checked){
       var Fmob = document.getElementById("LGmobile_field").value;
       var fromDate = document.getElementById("leaving_day").value;
       var toDate = document.getElementById("return_day").value;
       var Uaddress = document.getElementById("address").value;
       console.log(name+" "+userId+" "+branch+" "+mob+" "+Fmob+" "+fromDate+" "+toDate+" "+Uaddress+" "+'leaveRequest/' + userId);
       if(Fmob === "" || fromDate === "" || toDate === "" || Uaddress === ""){
           alert("there's some invalid or missing information , please fill it again properly");
       }else if(d >= fromDate){
           alert("the date seems to be invalid , please fill again");
       }else{
         firebase.database().ref('leaveRequest/' + userId).set({
           name: name,
           regno: regno,
           Fmob: Fmob,
           from: fromDate,
           to: toDate,
           address: Uaddress,
           leave:'yes',
         });
         alert("your leave request has been submitted");
         document.getElementById("leave_application").style.display = "none";

       }

     }else if(nightRb.checked){

     }
   }, function (errorObject) {
     console.log("The read failed: " + errorObject.code);
   });

}
function logout(){
  firebase.auth().signOut();
}

load(){
  
}
//Amitav your attention here
function verify(){

}
