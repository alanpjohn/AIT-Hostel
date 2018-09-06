firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.open("login.html","_self");
    if(user != null){

    }

  } else {
  }
});

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

function logout(){
  firebase.auth().signOut();
}
