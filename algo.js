var arr = [];
var firebasedb = firebase.database();
var fref = firebasedb.ref('roompreferences');
fref.on('child_added', function(data) {
  arr.append(data.key);
});

//arr contains all the regno of all the room pref

//use this to understand how to extract details from the database
function extract(regno){
  var pref = firebasedb.ref(`roompreferences/`+regno);
  pref.on('value', function(data) {
    var merit = data.val().merit;
  });

}

//how the value of attributes of node are set
function finalize(room){
  firebase.database().ref('rooms/' + room).set({
    capacity : 3,
    occ2: 17123
  });
}
