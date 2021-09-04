const showProduct = (productos) => {
    const aux = document.createElement("div"); // Contenedor
    // Se recorre el array de productos
    for (let prod of productos) {
//        console.log(prod);
      aux.innerHTML += `<h3>${prod.name}</h3>` ; // Nombre del producto
      aux.innerHTML += `<hr>`;
      const cont = document.createElement("dl"); // Contenedor de la información
      aux.appendChild(cont);

      cont.innerHTML += `<dt>Descripción</dt>`; // Descripción
      cont.innerHTML += `<dd> <p> ${prod.description} </p> </dd>`;

      cont.innerHTML += `<dt>Precio</dt>`; // Precio
      cont.innerHTML += `<dd> <p> ${prod.cost} ${prod.currency} </p> </dd>`;

      cont.innerHTML += `<dt>Recuento Vendido</dt>`; // Recuento Vendido
      cont.innerHTML += `<dd> <p> ${prod.soldCount} </p> </dd>`;

      cont.innerHTML += `<dt>Imágenes</dt>`; // Fotografías
      cont.innerHTML += `
      <dd>
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + prod.imgSrc + `" alt="">
            </div>
        </div>
      </dd>`;

      aux.innerHTML += `<hr>`;
    }
    document.getElementsByClassName("container p-5")[0].appendChild(aux); // Agrego aux al div de clase "container p-5" y muestro en pantalla
  };

// Filtros a partir de rango de precio definido.
function sortProductRank(productos, minCount, maxCount){
  let result = [];

  for(let prod of productos){
    if (((minCount == undefined) || ((minCount != undefined) && (prod.cost >= minCount))) && 
    ((maxCount == undefined) || ((maxCount != undefined) && (prod.cost <= maxCount)))){

      result.push(prod);
    }
  }
  return result;
}
  
// Funcionalidades de orden ascendente y descendente en función del precio y descendente en función de la relevancia.
const ORDER_BY_PROD_PRICE_DOWN = "PriceDown";
const ORDER_BY_PROD_PRICE_UP = "PriceUp";
const ORDER_BY_PROD_RELEVANCE = "Relevance";

function sortProduct(criteria, array){
  let result = [];
  
  if (criteria === ORDER_BY_PROD_PRICE_DOWN){ // Funcionalidad de orden descendente en función del precio.
    result = array.sort(function(a, b) {
    if ( a.cost > b.cost ){ return -1; }
    if ( a.cost < b.cost ){ return 1; }
    return 0;
    });
  } else if (criteria === ORDER_BY_PROD_PRICE_UP){ // Funcionalidad de orden ascendente en función del precio.
    result = array.sort(function(a, b) {
      if ( a.cost > b.cost ){ return 1; }
      if ( a.cost < b.cost ){ return -1; }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_RELEVANCE){ // Funcionalidad de orden descendente en función de la relevancia.
    result = array.sort(function(a, b) {
      if ( a.soldCount > b.soldCount ){ return -1; }
      if ( a.soldCount < b.soldCount ){ return 1; }
      return 0;
    });
  }
  return result;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
    const producto = (await getJSONData(PRODUCTS_URL)).data;
//    console.log(producto);
    // Mostrar productos.
    showProduct(producto);

    // Filtros a partir de rango de precio definido.
    var minCount = undefined;
    var maxCount = undefined;

    // Filtros a partir de rango de precio definido. Boton Filtrar.
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
      document.getElementsByClassName("container p-5")[0].innerHTML = "";
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if ((minCount === undefined) || (minCount === "") || (minCount <= 0)){
        minCount = undefined;
      }

      if ((maxCount === undefined) || (maxCount === "") || (maxCount <= 0)){ 
        maxCount = undefined;
      }

      showProduct(sortProductRank(producto, minCount, maxCount));
    });

    // Filtros a partir de rango de precio definido. Boton Limpiar.
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementsByClassName("container p-5")[0].innerHTML = "";

      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showProduct(producto);
    });

    // Funcionalidad de orden descendente en función del precio.
    document.getElementById("sortByPriceDown").addEventListener("click", function(){
      document.getElementsByClassName("container p-5")[0].innerHTML = "";
      showProduct(sortProduct(ORDER_BY_PROD_PRICE_DOWN, sortProductRank(producto, minCount, maxCount)));
    });

    // Funcionalidad de orden ascendente en función del precio.
    document.getElementById("sortByPriceUp").addEventListener("click", function(){
      document.getElementsByClassName("container p-5")[0].innerHTML = "";
      showProduct(sortProduct(ORDER_BY_PROD_PRICE_UP, sortProductRank(producto, minCount, maxCount)));
    });

    // Funcionalidad de orden descendente en función de la relevancia.
    document.getElementById("sortByRelevance").addEventListener("click", function(){
      document.getElementsByClassName("container p-5")[0].innerHTML = "";
      showProduct(sortProduct(ORDER_BY_PROD_RELEVANCE, sortProductRank(producto, minCount, maxCount)));
    });
});