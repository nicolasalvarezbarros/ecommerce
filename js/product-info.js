const starOn = `<span class="fa fa-star checked">`; // Estrella amarilla

// Muestro información del producto
const showProduct = (product, catego) => {
    // Busco índice del arreglo de categorías que corresponde al producto 
    var i = 0;
    while ((i < catego.length) && (catego[i].name !== product.category)) {
        i++;
    }

    var currency = "$";
    if (product.currency === "USD") {
        currency = "U$S"
    } 

    const aux = document.createElement("div"); // Contenedor
    // Se recorre el array de productos
    aux.innerHTML += `
        <h3 class="text-center"><b>${product.name} </b></h3>
        <hr>

        <!-- <div class="row text-center text-lg-left pt-2" id="productImages"></div> -->
        <div id="carouselImages" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators" id="carouselIndicators"></ol>

            <div class="carousel-inner" id="carouselInner"></div>

            <a class="carousel-control-prev" href="#carouselImages" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselImages" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <hr>

        <h3 class="text-center">Costo: <b>${currency} ${product.cost}</b></h3>

        <div class="text-center">
            <div class="form-inline cant">
                <h5>Cantidad: <h5>

                <div class="input-group mb-0 w-100 form-group col-md-8"> <!-- Cantidad -->                     
                    <div class="input-group-prepend">
                        <button id="minus"><span class="h3">-</span></button>
                    </div>
                    <input min="1" name="quantity" value="1" type="number" class="form-control text-center" id="cantidad">
                    <div class="input-group-append">
                        <button id="plus"><span class="h3">+</span></button>
                    </div>
                </div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-lg" id="comprar">Comprar ahora</button>
            <br> <br>
            <button type="submit" class="btn btn-info btn-lg" id="enviar_carrito">Agregar al carrito</button>
        </div>

        <hr>

        <h5><b>Descripción</b></h5>
        <p> ${product.description} </p>
        <br> <br>
        
        <div class="container d-flex flex-column flex-md-row justify-content-between ">
            <a class="py-2 d-none d-md-inline-block list-group-item list-group-item-action" >
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1"><br>Recuento <br> Vendido:</h4>
                    <h4 class="mb-1"><br><b> ${product.soldCount} </b></h4>
                    <h4 class="mb-1"><br>Productos <br> de la misma <br> Categoría:</h4>
                </div> 
            </a>

            <a class="py-2 d-none d-md-inline-block list-group-item list-group-item-action" href="category-info.html">
                <div class="row">
                    <div class="col-sm">
                        <img src="` + catego[i].imgSrc + `" alt="` + catego[i].description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ catego[i].name +`</h4>
                            <small class="text-muted">` + catego[i].productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + catego[i].description + `</p>
                    </div>
                </div>
            </a>
        </div>
        <br> <br>`;
    
    document.getElementById("Producto").appendChild(aux); // Agrego aux al div de clase "container p-5" y muestro en pantalla
};

function showImages(product){
//    for (let img of product.images) {
//        document.getElementById("productImages").innerHTML += `
//            <div class="col-lg-3 col-md-4 col-6">
//               <div class="d-block mb-4 h-100">
//                    <img class="img-fluid img-thumbnail" src="` + img + `" alt="">
//                </div>
//            </div>
//        `;
//    }

    var i = 0;
    for (let img of product.images) {
        if (img === product.images[0]){
            document.getElementById("carouselIndicators").innerHTML += 
            `<li data-target="#carouselImages" data-slide-to="0" class="active"></li>`;

            document.getElementById("carouselInner").innerHTML += `
            <div class="carousel-item active">
                <img src="` + img + `" class="d-block w-100" alt="">
            </div>`;
        } else {
            i++;
            document.getElementById("carouselIndicators").innerHTML += 
            `<li data-target="#carouselImages" data-slide-to="${i}"></li>`;

            document.getElementById("carouselInner").innerHTML += `
            <div class="carousel-item">
                <img src="` + img + `" class="d-block w-100" alt="">
            </div>`;
        };
    }
}

const showComments = (comentarios) => {
    const aux = document.createElement("div"); // Contenedor
    // Se recorre el array de productos
    for (let coment of comentarios) {
//        console.log(prod);
      aux.innerHTML += `
      <a class="list-group-item list-group-item-action">
        <h5>${coment.user}</h5>              <!-- Nombre del usuario -->
        <div class="rating" id="${coment.dateTime}"></div>   <!-- Estrellas -->
        <p>${coment.description}</p>             <!-- Descripción del comentario -->
        <p>${coment.dateTime}</p>                <!-- Fecha -->
      </a>`
    }
    document.getElementsByClassName("container p-5")[0].appendChild(aux); // Agrego aux al div de clase "container p-5" y muestro en pantalla
  };

function showStarsComments(comentarios){
    for (let coment of comentarios){
        if (coment.score === 1){
            document.getElementById(coment.dateTime).innerHTML = starOn;
        } else if (coment.score === 2) {
            document.getElementById(coment.dateTime).innerHTML = starOn + starOn;
        } else if (coment.score === 3) {
            document.getElementById(coment.dateTime).innerHTML = starOn + starOn + starOn;
        } else if (coment.score === 4) {
            document.getElementById(coment.dateTime).innerHTML = starOn + starOn + starOn + starOn;
        } else if (coment.score === 5) {
            document.getElementById(coment.dateTime).innerHTML = starOn + starOn + starOn + starOn + starOn;
        }      
    }
}

// Funcionalidad de la clasificación por estrellas.
function showStars(number, action){
    if (number === "1"){
        document.getElementById("estrella1").innerHTML = `<span class="fa fa-star ${action}"></span>`;
        document.getElementById("estrella2").innerHTML = `<span class="fa fa-star"></span>`;
        document.getElementById("estrella3").innerHTML = `<span class="fa fa-star"></span>`;
        document.getElementById("estrella4").innerHTML = `<span class="fa fa-star"></span>`;
        document.getElementById("estrella5").innerHTML = `<span class="fa fa-star"></span>`;
    } else if (number === "2"){
        document.getElementById("estrella1").innerHTML = `<span class="fa fa-star checked"></span>`;
        document.getElementById("estrella2").innerHTML = `<span class="fa fa-star ${action}"></span>`;
        document.getElementById("estrella3").innerHTML = `<span class="fa fa-star"></span>`;
        document.getElementById("estrella4").innerHTML = `<span class="fa fa-star"></span>`;
        document.getElementById("estrella5").innerHTML = `<span class="fa fa-star"></span>`;
    } else if (number === "3"){
        document.getElementById("estrella1").innerHTML = `<span class="fa fa-star checked"></span>`;
        document.getElementById("estrella2").innerHTML = `<span class="fa fa-star checked"></span>`;
        document.getElementById("estrella3").innerHTML = `<span class="fa fa-star ${action}"></span>`;
        document.getElementById("estrella4").innerHTML = `<span class="fa fa-star"></span>`;
        document.getElementById("estrella5").innerHTML = `<span class="fa fa-star"></span>`;
    } else if (number === "4"){
        document.getElementById("estrella1").innerHTML = `<span class="fa fa-star checked"></span>`;
        document.getElementById("estrella2").innerHTML = `<span class="fa fa-star checked"></span>`;
        document.getElementById("estrella3").innerHTML = `<span class="fa fa-star checked"></span>`;
        document.getElementById("estrella4").innerHTML = `<span class="fa fa-star ${action}"></span>`;
        document.getElementById("estrella5").innerHTML = `<span class="fa fa-star"></span>`;
    } else if (number === "5"){
        document.getElementById("estrella1").innerHTML = `<span class="fa fa-star checked"></span>`;
        document.getElementById("estrella2").innerHTML = `<span class="fa fa-star checked"></span>`;
        document.getElementById("estrella3").innerHTML = `<span class="fa fa-star checked"></span>`;
        document.getElementById("estrella4").innerHTML = `<span class="fa fa-star checked"></span>`;
        document.getElementById("estrella5").innerHTML = `<span class="fa fa-star ${action}"></span>`;
    }
}

// Nuevo comentario.
function showNewComments(fecha){
    // Descripción del comentario.
    var aux = document.getElementById("comentario").value;

    // Nombre de usuario.
    if (JSON.parse(localStorage.getItem("datos")) !== null) {
        var usuario = JSON.parse(localStorage.getItem("datos"))[0].user;
    } else {
        var usuario = localStorage.getItem("datos2");
    };

    // Agrego comentario.
    const contenedor = document.createElement("div"); // Contenedor
    contenedor.innerHTML += `
        <a class="list-group-item list-group-item-action">
            <h5>${usuario}</h5>              <!-- Nombre del usuario -->
            <div class="rating" id="${fecha}"></div>   <!-- Estrellas -->
            <p>${aux}</p>             <!-- Descripción del comentario -->
            <p>${fecha}</p>                <!-- Fecha -->
        </a>`;
    document.getElementsByClassName("container p-5")[0].appendChild(contenedor);
}

// Poner estrellas en el nuevo comentario.
function showStarsNewComments(es1, es2, es3, es4, es5, fecha){  
    if (es5 !== ""){
        document.getElementById(fecha).innerHTML = starOn + starOn + starOn + starOn + starOn;
    } else if (es4 !== "") {
        document.getElementById(fecha).innerHTML = starOn + starOn + starOn + starOn;
    } else if (es3 !== "") {
        document.getElementById(fecha).innerHTML = starOn + starOn + starOn;
    } else if (es2 !== "") {
        document.getElementById(fecha).innerHTML = starOn + starOn;
    } else if (es1 !== "") {
        document.getElementById(fecha).innerHTML = starOn;
    }      
}

// Mostrar Productos Relacionados

function  showRelatedProduct4 (info_product, product, idd){
    for (let info_prod of info_product) {
        document.getElementById(idd).innerHTML += `
        <a href="product-info.html" class="list-group-item list-group-item-action py-2 d-none d-sm-inline-block">
            <img class="img-fluid img-thumbnail" src="` + product[info_prod].imgSrc + `" alt="">
            <h3> ${product[info_prod].cost} ${product[info_prod].currency} </h3>
            <h4>${product[info_prod].name}</h4> <!-- Nombre del producto -->
            <p> ${product[info_prod].description} </p>   <!--Descripción -->
        </a>`
    }

    const cuadro = `<a class="list-group-item list-group-item-action py-2 d-none d-md-inline-block"></a>`;
    //console.log(info_product.relatedProducts.length);
    if (info_product.length === 0){
        document.getElementById(idd).innerHTML += cuadro + cuadro + cuadro + cuadro;
    } else if (info_product.length === 1) {
        document.getElementById(idd).innerHTML += cuadro + cuadro + cuadro;
    } else if (info_product.length === 2) {
        document.getElementById(idd).innerHTML += cuadro + cuadro;
    } else if (info_product.length === 3) {
        document.getElementById(idd).innerHTML += cuadro;
    }
};

function  showRelatedProduct (info_product, product){
    if (info_product.length <= 4){
        showRelatedProduct4 (info_product, product, "relatedProducts1");
    } else {
        showRelatedProduct4 ([info_product[0], info_product[1], info_product[2], info_product[3]], product, "relatedProducts1");
    };

    var entero = (info_product.length / 4 |0);
    var resto = (info_product.length % 4);
    var top = entero;
    //console.log(entero, resto);

    if (resto >= 0){
        top++;
    };

    var ProdRel = [];
    var aux = 0;
    var cont = 5;

    if (top >= 2){
        for (var i = 2; i < top +1; i++) {
            aux = i * 4;
            while ((cont <= info_product.length) && (cont <= aux)){
                ProdRel.push(info_product[cont-1]);
                cont++;
            }
            //console.log(ProdRel);
            document.getElementById("carruselProduct").innerHTML += `
            <div class="carousel-item ">
                <div class="container d-flex flex-column flex-sm-row justify-content-between" id="${cont}"></div>
            </div>`;
            showRelatedProduct4 (ProdRel, product, cont);
            ProdRel = [];
        }
    }
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function(e){
    const producto = (await getJSONData(PRODUCT_INFO_URL)).data;
    const comentario = (await getJSONData(PRODUCT_INFO_COMMENTS_URL)).data;
    const products = (await getJSONData(PRODUCTS_URL)).data;
    const categoria = (await getJSONData(CATEGORIES_URL)).data;

    // Mostrar todo en pantalla.
    showProduct(producto, categoria);
    showImages(producto);
    showComments(comentario);
    showStarsComments(comentario);
    showRelatedProduct(producto.relatedProducts, products);
    //showRelatedProduct([0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 3], products);

    // Estrellas
    var estrella_1 = "";
    var estrella_2 = "";
    var estrella_3 = "";
    var estrella_4 = "";
    var estrella_5 = "";

    document.getElementById("estrella1").addEventListener("click", function(){
        if (estrella_1 === "") {
            estrella_1 = "checked";
        } else {
            estrella_1 = "";
        }
        showStars("1", estrella_1);
        estrella_2 = "";
        estrella_3 = "";
        estrella_4 = "";
        estrella_5 = "";
    });

    document.getElementById("estrella2").addEventListener("click", function(){
        if (estrella_2 === "") {
            estrella_2 = "checked";
        } else {
            estrella_2 = "";
        }
        showStars("2", estrella_2);
        estrella_1 = "checked";
        estrella_3 = "";
        estrella_4 = "";
        estrella_5 = "";
    });

    document.getElementById("estrella3").addEventListener("click", function(){
        if (estrella_3 === "") {
            estrella_3 = "checked";
        } else {
            estrella_3 = "";
        }
        showStars("3", estrella_3);
        estrella_1 = "checked";
        estrella_2 = "checked";
        estrella_4 = "";
        estrella_5 = "";
    });

    document.getElementById("estrella4").addEventListener("click", function(){
        if (estrella_4 === "") {
            estrella_4 = "checked";
        } else {
            estrella_4 = "";
        }
        showStars("4", estrella_4);
        estrella_1 = "checked";
        estrella_2 = "checked";
        estrella_3 = "checked";
        estrella_5 = "";
    });

    document.getElementById("estrella5").addEventListener("click", function(){
        if (estrella_5 === "") {
            estrella_5 = "checked";
        } else {
            estrella_5 = "";
        }
        showStars("5", estrella_5);
        estrella_1 = "checked";
        estrella_2 = "checked";
        estrella_3 = "checked";
        estrella_4 = "checked";
    });

    // Comentarios.

    document.getElementById("enviar_comentario").addEventListener("click", function(){
        if (document.getElementById("comentario").value !== ""){
            // Generar nuevo comentario.
            var hoy = new Date();
            var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate(); // Fecha
            var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds(); // Hora.
            var fechaYHora = fecha + ' ' + hora; // Fecha y 
            
            showNewComments(fechaYHora);
            showStarsNewComments(estrella_1, estrella_2, estrella_3, estrella_4, estrella_5, fechaYHora);

            // Vaciar todo.
            document.getElementById("comentario").value = "";
            estrella_1 = "";
            estrella_2 = "";
            estrella_3 = "";
            estrella_4 = "";
            estrella_5 = "";
            showStars("1", estrella_1);
            document.getElementById("comm").innerHTML += `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Comentario publicado con exito!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`; // Alerta de comentario publicado con exito.
            //alert("Comentario publicado con exito!");
        }
    });

    // Boton - de cantidad.
    document.getElementById("minus").addEventListener("click", function(){
        var antt = document.getElementById("cantidad");
        var ant = parseInt(antt.value);
        
        if (ant !== 1){
            antt.value = ant - 1; 
        }            
    });

    // Boton + de cantidad.
    document.getElementById("plus").addEventListener("click", function(){
        var sigg = document.getElementById("cantidad");
        var sig = parseInt(sigg.value);
        
        sigg.value = sig + 1; 
    });

    // Boton enviar a carrito.
    document.getElementById("enviar_carrito").addEventListener("click",async function(){
        let aler = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Producto añadido al carrito con exito!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;

        if (localStorage.getItem("cartArticles") === null) {
            var addProduct = {
                "articles": [
                    {
                        "name": producto.name,
                        "count": document.getElementById("cantidad").value,
                        "unitCost": producto.cost,
                        "currency": producto.currency,
                        "src": producto.images[0]
                    }
                ]
            };
            localStorage.setItem("cartArticles", JSON.stringify(addProduct)); 
            document.getElementById("comm").innerHTML = aler;
        } else {
            var datos = await JSON.parse(localStorage.getItem("cartArticles"));

            if (datos.articles.length == 0) {
                var addProduct = {
                    "name": producto.name,
                    "count": document.getElementById("cantidad").value,
                    "unitCost": producto.cost,
                    "currency": producto.currency,
                    "src": producto.images[0]
                };
                datos.articles.push(addProduct);
                localStorage.removeItem("cartArticles");
                localStorage.setItem("cartArticles", JSON.stringify(datos));
                document.getElementById("comm").innerHTML = aler;
            } else {
                
                var i = 1;
    
                while ((i  < datos.articles.length) && (datos.articles[i-1].name !== producto.name)) {
                    i++;
                }
               
                if ((i >= (datos.articles.length)) && (datos.articles[datos.articles.length - 1].name !== producto.name)) {
                    var addProduct = {
                        "name": producto.name,
                        "count": document.getElementById("cantidad").value,
                        "unitCost": producto.cost,
                        "currency": producto.currency,
                        "src": producto.images[0]
                    };
                
                    datos.articles.push(addProduct);
                    localStorage.removeItem("cartArticles");
                    localStorage.setItem("cartArticles", JSON.stringify(datos));
                    document.getElementById("comm").innerHTML = aler;
                } else {
                    document.getElementById("comm").innerHTML = `
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        <strong>El producto ya se encuantra añadido al carrito!</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
                }
            }
        }    
        //window.location="cart.html"
    });
});