var Vindex=1;
var Vtotal=0;
var Vtable=document.getElementById("Vtable");
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(user != null){

    }

  } else {
    window.Open("login.html","_self");
  }
});


var firebasedb = firebase.database();

var fref = firebasedb.ref('verificationRequest');
fref.on('child_added', function(data) {
  if(Vtotal==0){
      Vtable.deleteRow(1);
  }
  var r = Vtable.insertRow(Vindex);
  r.insertCell(0).innerHTML = data.val().name;
  r.insertCell(1).innerHTML = data.key;
  r.insertCell(2).innerHTML = data.val().branch;
  r.onclick=function(){
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


function logout(){
  firebase.auth().signOut();
}
