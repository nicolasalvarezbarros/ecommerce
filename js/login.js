const arr = [];

const buttonSingIn = () => {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    localStorage.removeItem("datos");
    if (user && pass) {
        arr.push({ user, pass });

        localStorage.setItem("datos", JSON.stringify(arr));
        window.location="index.html";
    } else {
        alert("Usuario y contraseña no deben ser vacíos");
      }  
};

// Autentificación con google
const onSignIn = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    localStorage.setItem("datos", profile.getEmail());
    window.location="index.html";
};
//

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btnSingIn").addEventListener("click", buttonSingIn);
});