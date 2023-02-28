class Zapatillas {
    constructor(id, nombre, cantidad, desc, precio, imagen){
        this.id = id,
        this.nombre = nombre,
        this.desc = desc,
        this.precio = precio, 
        this.imagen = imagen,
        this.cantidad = 1
    }
}

let carrito = []

const cargarEstanteria = async () => {
    const response = await fetch("productos.json")
    const data = await response.json()
    for(let zapas of data){
        let zapasNuevo = new Zapatillas(zapas.id, zapas.nombre, zapas.precio, zapas.imagen, zapas.desc)
        carrito.push(zapasNuevo)
    }
    console.log(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

if(localStorage.getItem("carrito")){ 
    for(let zapas of JSON.parse(localStorage.getItem("carrito"))){
        let zapasStorage = new Zapatillas(zapas.id, zapas.nombre, zapas.precio, zapas.imagen, zapas.desc)
        carrito.push(zapasStorage)
    }
    console.log(carrito)
}else{
    cargarEstanteria()
}

