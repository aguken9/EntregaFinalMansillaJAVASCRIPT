const stockProductos = [
    {
      id: 1,
      nombre: "PUMA",
      cantidad: 1,
      desc: "PUMA LAMELO",
      precio: 1000,
      img: "assets/pumalamelo.jpg",
    },
    {
      id: 2,
      nombre: "Adidas",
      cantidad: 1,
      desc: "ADIDAS RUNNING",
      precio: 2000,
      img: "assets/adidas.jpg",
    },
    {
      id: 3,
      nombre: "Fila",
      cantidad: 1,
      desc: "Fila Disruptor", 
      precio: 1570,
      img: "assets/fila.jpg",
    },
    {
      id: 4,
      nombre: "New Balance",
      cantidad: 1,
      desc: "New Balance 524",
      precio: 3000,
      img: "assets/newbalance.png",
    },
    {
      id: 5,
      nombre: "Nike",
      cantidad: 1,
      desc: "Nike Kobe",
      precio: 4200,
      img: "assets/nike.jpg",
    }
  ];
  let carrito = [];

  function Cambio1()
  {
    foto.src="assets/Z.jpg"
  }
  function Cambio2()
  {
    foto.src="assets/zwhite.jpg"
  }

  function Cambio3()
  {
    fotos.src="assets/estanteria.jpg"
  }

  function Cambio4()
  {
    fotos.src="assets/marcas.jpg"
  }
  
  let zapasDiv  = document.getElementById("zapatillasd")
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  let reloj = document.getElementById("reloj")


  const DateTime = luxon.DateTime
  const fechaHoy = DateTime.now()
  let fecha = document.getElementById("fecha")
  let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  fecha.innerHTML = `${fechaMostrar}`
  
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }
  
  if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: 'Compra realizada',
          icon: 'success',
          confirmButtonColor: 'green',
          text: `Muchas gracias por su compra.`,
          })
      }
    });
  }

  function verCatalogo(array){
    zapasDiv.innerHTML = ""
    for(let zapas of array){
        let nuevoZapasDiv = document.createElement("div")
        nuevoZapasDiv.className = "col-12 col-md-6 col-lg-4 my-3"
        nuevoZapasDiv.innerHTML = `
        <div id="${zapas.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="${zapas.img}" alt="${zapas.nombre}">
            <div class="card-body">
                <h4 class="card-title">${zapas.nombre}</h4>
                <p>Modelo: ${zapas.desc}</p>
                <p>Precio: ${zapas.precio}</p>
                <button id="agregarBtn${zapas.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div> 
        `
        zapasDiv.appendChild(nuevoZapasDiv)
        let agregarBtn = document.getElementById(`agregarBtn${zapas.id}`)
        agregarBtn.onclick = ()=>{          
          agregarProducto(zapas.id)
        }
    }
}

  
  const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }
    mostrarCarrito()
  
  };
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
          </div>
        </div>
        `;
      });
    }
  
    if (carrito.length === 0) {
      console.log("No hay objetos");
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
      console.log("Se ha agregado un objeto");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  

 
function ordenarMenorMayor(array){
    const menorMayor = [].concat(array)
    menorMayor.sort((param1, param2)=> param1.precio - param2.precio)
    verCatalogo(menorMayor)
}

function ordenarMayorMenor(array){
  const mayorMenor = [].concat(array)
  mayorMenor.sort((a,b)=> b.precio - a.precio)
  verCatalogo(mayorMenor)
}

function ordenarAlfabeticamenteTitulo(array){
  const ordenadoAlfabeticamente = [].concat(array)
  ordenadoAlfabeticamente.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return 1
      }
      if (a.nombre < b.nombre) {
        return -1
      }
 
      return 0
    })
    verCatalogo(ordenadoAlfabeticamente)
}


 
selectOrden.addEventListener("change", ()=>{
  if(selectOrden.value == "1"){
      ordenarMayorMenor(stockProductos)
  }else if(selectOrden.value =="2"){
      ordenarMenorMayor(stockProductos)
  }else if(selectOrden.value == "3"){
      ordenarAlfabeticamenteTitulo(stockProductos)
  }else{
      verCatalogo(stockProductos)
  }
})