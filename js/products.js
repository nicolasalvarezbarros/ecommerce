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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
    const producto = (await getJSONData(PRODUCTS_URL)).data;
//    console.log(producto);
    showProduct(producto);
});