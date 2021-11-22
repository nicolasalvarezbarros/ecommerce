const CART_INFO_URL_2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const dolarToPesos = 40; 
let wayToPayComplete = false;
let wayToPayAndShippingType = {"shippingType": {
                                            "street": "",
                                            "number": "",
                                            "corner": "",
                                            "country": "",
                                            "shippingType": ""
                                            }, 
                                    "wayToPay": {
                                            "wayToPay": "", 
                                            "dataWayToPay": {} 
                                            }
                                    };

function saveInformation(articles){
    localStorage.setItem("cartArticles", JSON.stringify(articles));   
};

function showProduct(productos) {
    const aux = document.getElementById("cart");
    const aux2 = document.getElementById("nameProduct");
    // Se recorre el array de productos
    if (productos.articles.length != 0){
        for (let prod of productos.articles) {
            var currency = "";
            if (prod.currency === "UYU") {
                currency = "$";
            } else if (prod.currency === "USD") {
                currency = "U$S";
            };
    
            aux.innerHTML += `
            <div class="row mb-4" id="product ${prod.name}">
                <div class="col-md-5 col-lg-3 col-xl-3">
                    <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                        <img class="img-fluid w-100 bd-placeholder-img" src="` + prod.src + `" alt="Sample">  
                    </div>
                </div>
                <div class="col-md-7 col-lg-9 col-xl-9">
    
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 id="Product"><strong id="productName">${prod.name}</strong></h5><!-- Nombre del Producto -->
                        </div>
                        <h5 class="mb-0"><span><strong id="unitCost">${currency} ${prod.unitCost}</strong></span></h5> <!-- Costo Unitario del Producto -->                         
                    </div>
       
                    <br>
    
                    <div class="d-flex justify-content-between align-items-center">
    
                        <div> <!-- Remover el artículo -->
                          <a href="" type="button" class="card-link text-uppercase mr-3" id="remove ${prod.name}">
                            <i class="fa fa-trash" aria-hidden="true"></i> Remover el artículo 
                          </a>
                        </div>
    
                        <div class="input-group mb-0 w-100 form-group col-md-5 needs-validation"> <!-- Cantidad -->                     
                            <div class="input-group-prepend">
                                <button id="minus ${prod.name}"><span>-</span></button>
                            </div>
                            <input min="1" name="quantity" value="${prod.count}" type="number" class="form-control text-center" id="${prod.name}">
                            <div class="input-group-append">
                              <button id="plus ${prod.name}"><span>+</span></button>
                            </div>
                            <div class="invalid-feedback"> Cantidad inválida!</div>
                        </div>  
                    </div>   
                </div>  
            </div>
            <hr>`;
    
            aux2.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center border-0" id="name ${prod.name}">
                ${prod.name}
                <span id="subtotal ${prod.name}"></span>
            </li>`;
        }
    }
}

function orderSummary(array){
    var total_unit = 0;
    var subtotal = 0; 
    var total = 0;
    const shippingg = parseInt(document.getElementById("shippingType").value) / 100;
    const currency = document.getElementById("currencyType").value;

    if (array.articles.length != 0){
        for (let art of array.articles) {
            if (currency === "$") {
                if (art.currency === "UYU"){
                    total_unit = total_unit + art.unitCost * art.count;
                } else {
                    total_unit = total_unit + art.unitCost * dolarToPesos* art.count;
                }
            } else if (currency === "U$S"){
                if (art.currency === "USD"){
                    total_unit = total_unit + art.unitCost * art.count;
                } else {
                    total_unit = total_unit + art.unitCost * art.count / dolarToPesos;
                }  
            }
            
            total_unit = Math.round(total_unit * 100) / 100;
            subtotal = subtotal + total_unit;
    
            const aux = document.getElementById("subtotal " + art.name);
            aux.innerHTML = currency + ` ` + total_unit;
            total_unit = 0;
        }

        total = Math.round((1 + shippingg) * subtotal * 100) / 100;
    }
    
    document.getElementById("subtotal").innerHTML = `${currency} ${subtotal}`;
    document.getElementById("shipping").innerHTML = `${currency} ${Math.round(shippingg * subtotal * 100) / 100}`;
    document.getElementById("total").innerHTML = `${currency} ${total}`;
}

function remove(saveInfo, i){
    var aux = saveInfo.articles[i];
    // Remover de pantalla datos del Producto.
    document.getElementById("product " + aux.name).innerHTML = ``;
    document.getElementById("name " + aux.name).innerHTML = ``;
    
    // Remover datos de LocalStorage.
    var aux2 = saveInfo;
    aux2.articles.splice(i, 1);
    localStorage.removeItem("cartArticles");
    saveInformation(aux2);

    // Ajustar Resumen del Pedido. 
    orderSummary(aux2);
}

function wayToPay(){
    let pay = document.getElementById("wayToPayy").value;
    let targetNumber = document.getElementById("moreData");
    let expiration = document.getElementById("moreData2");
    let accountNumber = document.getElementById("moreData3");

    if (pay === "credit"){
        targetNumber.style.display = "block";
        expiration.style.display = "block";
        accountNumber.style.display = "none";
    } else if (pay === "bank"){
        targetNumber.style.display = "none";
        expiration.style.display = "none";
        accountNumber.style.display = "block";
    } else {
        targetNumber.style.display = "none";
        expiration.style.display = "none";
        accountNumber.style.display = "none";
    }
}

function validation(place, valueBad, expr){
    let aux = document.getElementById(place);
    let expres = aux.value !== valueBad; 
     
    aux.classList.remove('is-invalid');
    aux.classList.remove('is-valid');

    if (valueBad === "notValue"){
        expres = expr.test(aux.value);
    }

    if (expres){
        aux.classList.add('is-valid');
        return true
    } else{ 
        aux.classList.add('is-invalid'); 
        return false
    }
}

function saveWayToPay(){
    let pay = document.getElementById("wayToPayy").value;
    let mensage = document.getElementById("mensage");
    let mensage2 = document.getElementById("mensage2");
    let mensage3 = document.getElementById("mensage3");
    let aux = true;
    let aux2 = true;
    let aux3 = true;
    let aux4 = true;

    aux = validation('wayToPayy',"paying", );

    if (pay === "credit") {

        if (document.getElementById("numberCard").value === "") {
            mensage.innerHTML = 'Debe de ingresar su número de tarjeta!';
            aux2 = validation('numberCard', "", );
        } else {
            mensage.innerHTML = 'Número de tarjeta inváldo!';
            aux2 = validation('numberCard', "notValue", /^[0-9]{13,18}$/);
        }
        
        if (document.getElementById("expiration").value === ""){
            mensage2.innerHTML = 'Debe de ingresar la fecha de vencimiento de su tarjeta!';
            aux3 = validation('expiration', "", );
        } else {
            mensage2.innerHTML = 'Fecha de vencimiento inválda!';
            aux3 = validation('expiration', "notValue", /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/([0-9][0-9])$/);
        }
    } else if (pay === "bank"){

        if (document.getElementById("numberCount").value === ""){
            mensage3.innerHTML = 'Debe de ingresar su número de cuenta!';
            aux4 = validation('numberCount', "", );
        } else {
            mensage3.innerHTML = 'Número de cuenta inváldo!';
            aux4 = validation('numberCount', "notValue", /^\w{12,40}$/);
        }   
    };

    if ((aux && aux2 && aux3) || (aux && aux4)) {
        // Actualizo variable que informa que esta todo completo correctamente lo de forma de pago.
        wayToPayComplete = true;

        // Cambio de color boton.
        let botonModal = document.getElementById("botonModal");
        botonModal.classList.remove('btn-primary');
        botonModal.classList.add('btn-success');

        // Guardo datos en localStorage.
        wayToPayAndShippingType.wayToPay.wayToPay = pay;
        if (pay === "credit"){
            wayToPayAndShippingType.wayToPay.dataWayToPay = {
                "numberCard": document.getElementById("numberCard").value,
                "expiration": document.getElementById("expiration").value,
            };
        } else {
            wayToPayAndShippingType.wayToPay.dataWayToPay = {
                "numberCount": document.getElementById("numberCount").value,
            };
        }

        localStorage.removeItem("wayToPayAndShippingType");
        localStorage.setItem("wayToPayAndShippingType", JSON.stringify(wayToPayAndShippingType)); 
    }
}


function saveShippingType(){
    let aux = true;
    let aux2 = true;
    let aux3 = true;
    let aux4 = true;
    let aux5 = true;

    // Validar datos de Método de Envío.
    aux = validation('street', "", );
    aux2 = validation('number', "", );
    aux3 = validation('corner', "", );
    aux4 = validation('country', "0", );
    aux5 = validation('shippingType', "0", );

    if (aux && aux2 && aux3 && aux4 && aux5) {
        // cambio de color boton.
        let boton = document.getElementById("saveChanges2");
        boton.classList.remove('btn-primary');
        boton.classList.add('btn-success');

        // Guardo datos en localStorage.
        wayToPayAndShippingType.shippingType.street = document.getElementById("street").value;
        wayToPayAndShippingType.shippingType.number = document.getElementById("number").value;
        wayToPayAndShippingType.shippingType.corner = document.getElementById("corner").value;
        wayToPayAndShippingType.shippingType.country = document.getElementById("country").value;
        wayToPayAndShippingType.shippingType.shippingType = document.getElementById("shippingType").value;

        localStorage.removeItem("wayToPayAndShippingType");
        localStorage.setItem("wayToPayAndShippingType", JSON.stringify(wayToPayAndShippingType));
    }
}

function clearAll(saveInfo){
    const aux = document.getElementById("cart");
    const aux2 = document.getElementById("nameProduct");
    // Remover de pantalla datos del Producto.
    aux.innerHTML = ``;
    aux2.innerHTML = ``;
    
    // Remover datos de LocalStorage.
    var aux3 = {"articles": []};

    localStorage.removeItem("cartArticles");
    saveInformation(aux3);

    localStorage.removeItem("wayToPayAndShippingType");

    // Ajustar Resumen del Pedido. 
    orderSummary(aux3);

    // Ajustar Método de Envío.
    document.getElementById("street").value = "";
    document.getElementById("street").classList.remove('is-valid');

    document.getElementById("number").value = "";
    document.getElementById("number").classList.remove('is-valid');

    document.getElementById("corner").value = "";
    document.getElementById("corner").classList.remove('is-valid');

    document.getElementById("country").value = "0";
    document.getElementById("country").classList.remove('is-valid');

    document.getElementById("shippingType").value = "0";
    document.getElementById("shippingType").classList.remove('is-valid');
    
    document.getElementById("saveChanges2").classList.remove('btn-success');
    document.getElementById("saveChanges2").classList.add('btn-primary');

    // Ajustar Forma de Pago.
    document.getElementById("currencyType").value = "$";

    document.getElementById("wayToPayy").value = "paying";
    document.getElementById("wayToPayy").classList.remove('is-invalid');
    document.getElementById("wayToPayy").classList.remove('is-valid');

    document.getElementById("moreData").style.display = "none";
    document.getElementById("moreData2").style.display = "none";
    document.getElementById("moreData3").style.display = "none";

    document.getElementById("botonModal").classList.remove('btn-success');
    document.getElementById("botonModal").classList.add('btn-primary');
}

function buy(saveInfo, message){
    var aler = document.getElementById("aler");
    // Datos de Método de Envío.
    var street = document.getElementById("street").value;
    var number = document.getElementById("number").value;
    var corner = document.getElementById("corner").value;
    var country = document.getElementById("country").value;
    var shippingType = document.getElementById("shippingType").value;

    if (saveInfo.articles.length == 0) {
        aler.innerHTML = `
            <a class="alert alert-primary alert-dismissible fade show" role="alert" href="categories.html">
                <strong>No has seleccionad ningún artículo!</strong>
                <br>
                <strong>Has clic aquí para ver nuestra sección de Artículos!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </a>`;
    } else if ((street === "") || (number === "") || (corner === "") 
    || (country === "0") || (shippingType === "0")){
        aler.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Debe completar todos los campos de Método de Envío!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`; 
    } else if (wayToPayComplete === false){
        aler.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Debe completar todos los campos de Forma de Pago!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`; 
    } else {
        clearAll(saveInfo); // Borrar todo de la pantalla.

        aler.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>${message.msg}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="location.reload();">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`; 
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function(e){
    const message = (await getJSONData(CART_BUY_URL)).data;
    const article = (await getJSONData(CART_INFO_URL_2)).data;

    if (localStorage.getItem("cartArticles") === null) {
        saveInformation(article);
    }
    

    const saveInfo = JSON.parse(localStorage.getItem("cartArticles"));
    //console.log(saveInfo);
    showProduct(saveInfo);
    orderSummary(saveInfo);

    var newSaveInfo = saveInfo;
    var i = -1;
    if (newSaveInfo.articles.length != 0){
        for (let art of newSaveInfo.articles) {
            document.getElementById("minus " + art.name).addEventListener("click", function(){
                var ant = parseInt(document.getElementById(art.name).value);
                var antt = document.getElementById(art.name);
                if (ant !== 1){
                    art.count = ant - 1;
                    antt.value = ant - 1; 
                    localStorage.removeItem("cartArticles");
                    saveInformation(newSaveInfo);
                    orderSummary(newSaveInfo);
                }            
            });
    
            document.getElementById("plus " + art.name).addEventListener("click", function(){
                var sig = parseInt(document.getElementById(art.name).value);
                var sigg = document.getElementById(art.name);
                art.count = sig + 1;
                sigg.value = sig + 1; 
                localStorage.removeItem("cartArticles");
                saveInformation(newSaveInfo);
                orderSummary(newSaveInfo);
            });
    
            document.getElementById(art.name).addEventListener("keyup", function(){
                var newNumber = parseInt(document.getElementById(art.name).value);

                let aux = validation(art.name, "notValue", /^[0-9]{1,2}$/);

                if (aux){
                    art.count = newNumber;
                    localStorage.removeItem("cartArticles");
                    saveInformation(newSaveInfo);
                    orderSummary(newSaveInfo);
                }
            });

            document.getElementById("remove " + art.name).addEventListener("click", function(){
                remove(newSaveInfo, i);
            });
    
            i = i + 1;
        };
    }

    document.getElementById("shippingType").addEventListener("click", function(){
        orderSummary(newSaveInfo);
    });

    document.getElementById("currencyType").addEventListener("click", function(){
        orderSummary(newSaveInfo);
    });

    document.getElementById("saveChanges2").addEventListener("click", function(){
        saveShippingType();
    });

    document.getElementById("wayToPayy").addEventListener("click", function(){
        wayToPay();
    });

    document.getElementById("saveChanges").addEventListener("click", function(){
        saveWayToPay();
    });

    document.getElementById("buy").addEventListener("click", function(){
        buy(newSaveInfo, message);
    });
});