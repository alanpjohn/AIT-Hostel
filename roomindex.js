document.getElementById("allotDetails").style.display="none";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(user != null){
      //window.open("login.html","_self");
    }

  } else {
    //window.open("login.html","_self");
  }
});

function logout(){
  firebase.auth().signOut();
  window.open("login.html","_self");
}
