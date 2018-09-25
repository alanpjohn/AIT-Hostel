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

function uncheck(){
  document.getElementById("overrideflag").checked = false;
}

function pChanger(){
  var state = document.getElementById("overrideflag");
    document.getElementById("pOverridden").innerHTML = (state.checked)? "Anyone":"Preferred Roommate";
}

function showDetails(){
  document.getElementById("allotDetails").style.display = "block";
}

function hideDetails(){
  document.getElementById("allotDetails").style.display = "none";
}
