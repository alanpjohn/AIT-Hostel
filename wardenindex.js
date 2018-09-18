var Vindex=0;
var VSindex=1;
var Vtotal=0;
var wardenEmail;
var flag = 0;
var wardenPass;
var Vtable=document.getElementById("Vtable");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(user != null && flag == 0){
      var email_id = user.email;
      var uid = user.uid;
      firebasedb.ref(`/users/`+uid).on("value", function(snapshot) {
        console.log(snapshot.val());
        var cat = snapshot.val().category;
        if(cat != "warden"){
          logout();
          window.alert("Unauthorised access");
        }else{
          wardenEmail = email_id;
        }

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }else if(user != null && flag == 1){

    }

  } else {
    window.open("login.html","_self");
  }
});


var firebasedb = firebase.database();

var fref = firebasedb.ref('verificationRequest');
fref.on('child_added', function(data) {
  if(Vtotal==0){
      Vtable.deleteRow(1);
  }
  var r = Vtable.insertRow(Vindex+1);
  r.insertCell(0).innerHTML = data.val().name;
  r.insertCell(1).innerHTML = data.key;
  r.insertCell(2).innerHTML = data.val().branch;
  r.onclick=function(){
    VSindex=Vindex;
    document.getElementById("Vname").innerHTML="Name : "+data.val().name;
    document.getElementById("Vregno").innerHTML="RegNo : "+data.key;
    document.getElementById("Vbranch").innerHTML="Branch : "+data.val().branch;
    document.getElementById("Vemail").innerHTML="email : "+data.val().email;
    document.getElementById("VFname").innerHTML="Father's Name : "+data.val().Father;
    document.getElementById("VFrank").innerHTML="Father's rank : "+data.val().Father_rank;
    document.getElementById("VFadd").innerHTML="Father;s address : "+data.val().Father_address;
    document.getElementById("VFmob").innerHTML="Father's mobile : "+data.val().Father_mob;
    document.getElementById("VLGname").innerHTML="Local Guardian's name: "+data.val().Local_Guardian;
    document.getElementById("VLGmob").innerHTML="Local Guardian's mob : "+data.val().Local_Guardian_mob;
    document.getElementById("VLadd").innerHTML="Local Guardian's address : "+data.val().Local_Guardian_address;
  };
  Vtotal++;
  document.getElementById("verification").innerHTML=Vtotal;
  Vindex++;
});
fref.on('child_changed', function(data) {

});

fref.on('child_removed', function(data) {

});


function addUser(){
  console.log(VSindex);
  var regNo=Vtable.children[0].children[VSindex].children[1].innerHTML;
  console.log(regNo);
  var snapshot;
  var pref = firebasedb.ref('verificationRequest/' + regNo);
  pref.on(`value`,function(data){
    //console.log(data.val());
    snapshot = data.val();
  });
  console.log(snapshot);
  var email = snapshot.email;
  var password = "Ewarden";
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Failed to make account\n"+errorMessage);
  });
  flag = 1;
  firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){

  });

  var user = firebase.auth().currentUser;
  var uid = user.uid;
  firebase.database().ref(`users/`+uid).set({
    name: snapshot.name,
    email: email,
    category:"student",
    Dob : snapshot.dob,
    branch : snapshot.branch,
    mobile : snapshot.mobile,
    regno : snapshot.regno,
    Father : snapshot.Father,
    Father_address : snapshot.Father_address,
    Father_rank : snapshot.Father_rank,
    Father_mob : snapshot.Father_mob,
    Local_Guardian : snapshot.Local_Guardian,
    Local_Guardian_mob : snapshot.Local_Guardian_mob,
    Local_Guardian_address : snapshot.Local_Guardian_address,
  });
  flag = 0;
  firebase.auth().signInWithEmailAndPassword(wardenEmail,wardenPass).catch(function(error){

  });



}

function logout(){
  firebase.auth().signOut();
  window.open("login.html","_self");
}
  /*

var password1 = document.getElementById("password_enter").value;
  var password2 = document.getElementById("password_confirm").value;
  if (!((/[a-z]/.test(password1)) && (/[A-Z]/.test(password1)) && (/[0-9]/.test(password1)) && password1.length>7))
    errs +="Password must contain at least one digit, uppercase and lowercase letter, and at least 8 or more characters\n";
  if (password2!==password1)
    errs +="Passwords do not match\n";

  */
