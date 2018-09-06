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

function load(){

}

function verify(){
  var firebasedb = firebase.database();
  var userEmail = document.getElementById("email_enter").value.trim();
  var password1 = document.getElementById("password_enter").value;
  var password2 = document.getElementById("password_confirm").value;
  var name = document.getElementById("name_field").value.trim();
  var regNo = document.getElementById("regno_field").value.trim();
  var number = document.getElementById("mobile_field").value.trim();
  var birthDate = document.getElementById("birth_date").value.trim();
  var fName = document.getElementById("father_field").value.trim();
  var fRank = document.getElementById("rank_field").value.trim();
  var fAddress = document.getElementById("Faddress_field").value.trim();
  var fNumber = document.getElementById("Fmobile_field").value.trim();
  var lgName = document.getElementById("LG_field").value.trim();
  var lgAddress = document.getElementById("LGaddress_field").value.trim();
  var lgNumber = document.getElementById("LGmobile_field").value.trim();
  var branch ;
  if(document.getElementById("comp").checked){
    branch = "Comp";
  }else if(document.getElementById("IT").checked){
    branch = "IT";
  }else if(document.getElementById("Mech").checked){
    branch = "Mech";
  }else if(document.getElementById("E&TC").checked){
    branch = "E&tC";
  }
  var errs = "";
  if (userEmail.indexOf('@') < 1 || (userEmail.lastIndexOf('.')-userEmail.indexOf('@') < 2))
    errs +="Invalid Email ID\n";
  if (!((/[a-z]/.test(password1)) && (/[A-Z]/.test(password1)) && (/[0-9]/.test(password1)) && password1.length>7))
    errs +="Password must contain at least one digit, uppercase and lowercase letter, and at least 8 or more characters\n";
  if (password2!==password1)
    errs +="Passwords do not match\n";
  if (name.indexOf(' ') < 2 || (name.indexOf(' ') == name.length))
    errs +="Please enter your Full Name\n";
  if (regNo<13000 || regNo>18999)
    errs +="Invalid Registration Number\n";
  var phoneNum = number.replace(/[^\d]/g, '');
  if (phoneNum.length<7 || phoneNum.length>12)
    errs +="Your number is Invalid\n";
  if (birthDate ==="")
    errs +="Enter your Birthdate\n";
  if (fName.indexOf(' ') < 2 || (fName.indexOf(' ') == fName.length))
    errs +="Please enter your Father's Full Name\n";
  if (fRank === "")
    errs +="Enter Father's Rank\n";
  if (fAddress ==="")
    errs +="Enter Father's Address\n";
  var phoneNum = fNumber.replace(/[^\d]/g, '');
  if (phoneNum.length<7 || phoneNum.length>12)
    errs +="Your Father's number is Invalid\n";
  if (errs.length == 0){
    console.log("Success : "+userEmail+" "+password1+" "+password2+" "+name+" "+regNo+" "+number+" "+birthDate+" "+fName+" "+fRank+" "+fAddress+" "+fNumber+" "+lgName+" "+lgAddress+" "+lgNumber);
    firebase.database().ref('verificationRequest/' + regNo).set({
      name:name,
      email:userEmail,
      regno:regNo,
      dob:birthDate,
      Father :fName,
      Father_rank:fRank,
      Father_address :fAddress,
      Father_mob:fNumber,
      Local_Guardian: lgName,
      Local_Guardian_address :lgAddress,
      Local_Guardian_mob:lgNumber,
      branch : branch,
    });
  }
  else
    alert(errs);
}
