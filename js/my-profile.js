// Pone en pantalla el formulario.
function forms(){
    let formss = document.getElementById("corp");
    let botton = document.getElementById("botton");

    formss.innerHTML = `
    <h3 class="text-center">Editar Perfil.</h3>
    <br>

    <div class="text-center" id="image"></div>
    <br>

    <form>
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">Nombres:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="name" placeholder="" required>
        </div>
      </div>
      <div id="nameEdit"></div>

      <div class="form-group row">
        <label for="surname" class="col-sm-2 col-form-label">Apellidos:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="surname" placeholder="" required>
        </div>
      </div>
      <div id="surnameEdit"></div>

      <div class="form-group row">
        <label for="age" class="col-sm-2 col-form-label">Edad:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="age" placeholder="" required>
        </div>
      </div>
      <div id="ageEdit"></div>

      <div class="form-group row">
        <label for="mail" class="col-sm-2 col-form-label">E-mail:</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="mail" placeholder="name@example.com" required>
        </div>
      </div>
      <div id="mailEdit"></div>

      <div class="form-group row">
        <label for="telephone" class="col-sm-2 col-form-label">Teléfono de contacto:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="telephone" placeholder="" required>
        </div>
      </div>
    </form>
    `

    botton.innerHTML = `
    <button type="submit" class="btn btn-info btn-lg" id="save">Guardar</button>`
}

function saveImage(){
    let imagen = document.getElementById("image");

    imagen.innerHTML = `
    <div>
        <p>Foto de perfil:</p>
    </div>
    
    <div id="img">
    <img src="https://i.ibb.co/LQVbnqX/sinperfil.jpg" alt="sinperfil" class="rounded mx-auto d-block img-thumbnail" 
      style="max-height: 200px; max-width: 200px;"/>
    </div>
    <br>
    
    <div class="form-group row">
        <label for="imagSelect" class="col-sm-2 col-form-label">Escoja una imágen:</label>
        <div class="col-sm-10">
            <select id="imagSelect" class="form-control">
                <option value="https://i.ibb.co/LQVbnqX/sinperfil.jpg" selected>Imágen 0</option>
                <option value="https://i.ibb.co/XsWL4d2/1.png">Imágen 1</option>
                <option value="https://i.ibb.co/McQ6rvp/2.png">Imágen 2</option>
                <option value="https://i.ibb.co/gyYw2bn/3.png">Imágen 3</option>
                <option value="https://i.ibb.co/12KYFqG/4.png">Imágen 4</option>
                <option value="https://i.ibb.co/Gk71PSy/5.png">Imágen 5</option>
                <option value="https://i.ibb.co/cX6HPTB/6.png">Imágen 6</option>
                <option value="https://i.ibb.co/8XWWjKM/7.png">Imágen 7</option>
                <option value="https://i.ibb.co/MVHpPmg/8.png">Imágen 8</option>
                <option value="https://i.ibb.co/tHfz6vR/9.png">Imágen 9</option>
                <option value="https://i.ibb.co/j5LBJPc/10.png">Imágen 10</option>
                <option value="https://i.ibb.co/h1HD40r/11.png">Imágen 11</option>
                <option value="https://i.ibb.co/wgYrdHL/12.png">Imágen 12</option>
            </select>
        </div>
    </div>`
}



// Muestra en pantalla los datos del perfil guardados.
function savePerfil(){
    let perfil = JSON.parse(localStorage.getItem("perfil"));
    let corp = document.getElementById("corp");
    let botton = document.getElementById("botton"); 
                
    corp.innerHTML = `
    <img src="`+ perfil.img +`" alt="sinperfil" class="rounded mx-auto d-block img-thumbnail" 
     style="max-height: 200px; max-width: 200px;"/>
    <br>

    <dl>
        <h3>${perfil.name} ${perfil.surname}</h3>
        <br>
        <dt>Edad.</dt>
        <dd>${perfil.age}</dd>
        <br>
        <dt>E-mail.</dt>
        <dd>${perfil.mail}</dd>
        <br>
        <dt>Teléfono de contacto.</dt>
        <dd>${perfil.telephone}</dd>
    </dl>
    `;

    botton.innerHTML = `
    <button type="submit" class="btn btn-info btn-lg" id="edit">Editar</button>`
}

// Despliega las respectivas alertas y guarda datos del perfil en local storage.
function save(){
    let aler = document.getElementById("aler");
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let age = document.getElementById("age").value;
    let mail = document.getElementById("mail").value;
    let telephone = document.getElementById("telephone").value;

    let img = document.getElementById("imagSelect").value;
    
    let number = /[0-9]/;
    let textt = /[A-Z]/gi;
    let simbol = /[^A-Za-z0-9]/;
    let arroba = "@";
    //console.log(name.match(number));
    //console.log(name.match(textt));
    //console.log(name.match(simbol));
    //console.log(name.match(arroba));

    if ((name === "") || (surname === "") || (age === "") || (mail === "") || (telephone === "")) {
        aler.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" href="categories.html">
            <strong>Debe completar todos los campos del perfil!!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
    }  else if ((name.match(number)) || (surname.match(number))){
        aler.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" href="categories.html">
            <strong>Dato incorrecto, los nombres y apellidos sólo deben contener letras, sin números o símbolos!!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
    } else if ((age.match(simbol)) || (age.match(textt))){
        aler.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" href="categories.html">
            <strong>Dato incorrecto, la edad solo debe contener números, sin letras o símbolos!!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
    } else if (!mail.match(arroba)){
        aler.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" href="categories.html">
            <strong>Dato incorrecto, el e-mail debe contener el símbolo "@"!!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
    } else if ((telephone.match(simbol)) || (telephone.match(textt))){
        aler.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" href="categories.html">
            <strong>Dato incorrecto, el teléfono debe contener sólo números, sin letras o símbolos!!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
    } else {
        let perfil = {
            name: name,
            surname: surname,
            age: age,
            mail: mail,
            telephone: telephone,
            img: img
        }

        localStorage.setItem("perfil", JSON.stringify(perfil));

        aler.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert" href="categories.html">
            <strong>Sus datos fueron actualizados con éxito!!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;

        location.reload();
    }
}

// Retorna al menú de editar perfil y guarda en lo campos los datos guardados
function eddit(){
    let perfil = JSON.parse(localStorage.getItem("perfil"));

    forms();
    saveImage();

    let name = document.getElementById("name");
    let surname = document.getElementById("surname");
    let age = document.getElementById("age");
    let mail = document.getElementById("mail");
    let telephone = document.getElementById("telephone");

    let imagSelect = document.getElementById("img");
    imagSelect.innerHTML = `
    <img src="`+ perfil.img +`" alt="sinperfil" class="rounded mx-auto d-block img-thumbnail" 
     style="max-height: 200px; max-width: 200px;"/>`

    let image = document.getElementById("imagSelect");
    image.value = perfil.img;

    name.value = perfil.name;
    surname.value = perfil.surname;
    age.value = perfil.age;
    mail.value = perfil.mail;
    telephone.value = perfil.telephone;

    document.getElementById("save").addEventListener("click", function(){
        save();
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    if (localStorage.getItem("perfil") === null){
        forms();
        saveImage();

        document.getElementById("save").addEventListener("click", function(){
            save();
        });

        document.getElementById("imagSelect").addEventListener("click", function(){
            let imagSelect = document.getElementById("img");
            let imagen = document.getElementById("imagSelect").value;
            //console.log(imagen);

            imagSelect.innerHTML = `
            <img src="`+ imagen +`" alt="sinperfil" class="rounded mx-auto d-block img-thumbnail" 
             style="max-height: 200px; max-width: 200px;"/>`
        });
    } else {
        savePerfil();

        document.getElementById("edit").addEventListener("click", function(){
            eddit();

            document.getElementById("imagSelect").addEventListener("click", function(){
                let imagSelect = document.getElementById("img");
                let imagen = document.getElementById("imagSelect").value;
                //console.log(imagen);
    
                imagSelect.innerHTML = `
                <img src="`+ imagen +`" alt="sinperfil" class="rounded mx-auto d-block img-thumbnail" 
                 style="max-height: 200px; max-width: 200px;"/>`
            });
        });
    };
});