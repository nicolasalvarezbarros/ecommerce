document.addEventListener("DOMContentLoaded", function(e){
//    console.log(JSON.parse(localStorage.getItem("datos")));
    if (JSON.parse(localStorage.getItem("datos")) === null) {
      if (localStorage.getItem("datos2") === null) {
        window.location="login.html";
      };
//      window.location="login.html";
    };
  });