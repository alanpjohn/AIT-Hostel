var Vindex=0;
var VSindex=1;
var Vtotal=0;
var Vtable=document.getElementById("Vtable");
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(user != null){

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
    console.log(data.val());
    snapshot = data.val();
  });
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

}

function logout(){
  firebase.auth().signOut();
}
  /*

var password1 = document.getElementById("password_enter").value;
  var password2 = document.getElementById("password_confirm").value;
  if (!((/[a-z]/.test(password1)) && (/[A-Z]/.test(password1)) && (/[0-9]/.test(password1)) && password1.length>7))
    errs +="Password must contain at least one digit, uppercase and lowercase letter, and at least 8 or more characters\n";
  if (password2!==password1)
    errs +="Passwords do not match\n";

  */
