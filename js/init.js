const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// cerrar sesión de google.
//function signOut() {
 // var auth2 = gapi.auth2.getAuthInstance();
 // auth2.signOut().then(function () {
 //   console.log('User signed out.');
 //   localStorage.removeItem("datos2");
 // });
  //gapi.auth2.getAuthInstance().disconnect();
//}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  // Nombre de usuario
  if (JSON.parse(localStorage.getItem("datos")) !== null) {
    var usuario = JSON.parse(localStorage.getItem("datos"))[0].user;
    document.getElementById("userName").innerHTML = 
    `<div class="btn-group show">
    <a class="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    ${usuario}
    </a>
    <div class="dropdown-menu">
      <a href="my-profile.html" class="dropdown-item">Mi perfil</a>
      <a href="cart.html" class="dropdown-item">Ver mi carrito</a>
      <div class="dropdown-divider"></div>
      <a id="logout" class="dropdown-item" href="login.html">Cierre de sesión</a>
    </div>
  </div>`;

   // Cerrar sesión.
  document.getElementById("logout").addEventListener("click", function(){
    localStorage.removeItem("datos");  
  });

  } else {
    var usuario = localStorage.getItem("datos2");
    document.getElementById("userName").innerHTML = 
    `<div class="btn-group show">
    <a class="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    ${usuario}
    </a>
    <div class="dropdown-menu">
      <a href="my-profile.html" class="dropdown-item">Su perfil</a>
      <a href="cart.html" class="dropdown-item">Ver mi carrito</a>
      <div class="dropdown-divider"></div>
      <a id="logout" class="dropdown-item" href="login.html" onclick="signOut();">Cierre de sesión</a>
    </div>
  </div>`;
  };
  
});