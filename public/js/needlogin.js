//need log in script
var path = window.location.pathname;
var page = path.split("/").pop();
//console.log( path );
//console.log( {auth} );
xauth=document.getElementById("auth").value;
if(xauth=="" && page!="login" && page!="register" && page!="policy"){
  location.replace("login");
}
