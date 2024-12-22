

let carrito = [];
let cuerpo = document.querySelector(".bolsa table tbody");
let precio = 0;
let botones;
let cuenta = document.querySelector(".bolsa .cuenta");
let total = document.getElementById("precio5");

function Anadir() {
    let name = this.parentNode.querySelector("h3").textContent;
    let price = this.parentNode.querySelector("p").textContent;
    let url = this.parentNode.querySelector(".imagen img").getAttribute("src");

    carrito.push({ name: name, price: price, url: url });

    localStorage.setItem("articulos", JSON.stringify(carrito));

    cuenta.textContent = carrito.length;

    let newprice = parseFloat(price.slice(1));
    precio += newprice;
    total.textContent = precio.toFixed(2);

    localStorage.setItem("precio", precio.toFixed(2));

    actualizar();
}

function actualizar() {
    cuerpo.innerHTML = "";

    carrito.forEach(function (item, index) {
        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td><img src="${item.url}" alt="${item.name}" style="width: 50px;"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><a href="#" onclick="eliminar(${index});">X</a></td>
        `;

        cuerpo.appendChild(fila);
    });
}

function eliminar(index) {
    let position = carrito[index];

    carrito.splice(index, 1);

    let delprecio = parseFloat(position.price.slice(1));
    precio -= delprecio;
    total.textContent = precio.toFixed(2);

    cuenta.textContent = carrito.length;

    localStorage.setItem("articulos", JSON.stringify(carrito));
    localStorage.setItem("precio", precio.toFixed(2));
    actualizar();
}

window.addEventListener("load", cargar);

function cargar() {
    let itemlocal = localStorage.getItem("articulos");
    let preciolocal = localStorage.getItem("precio");

    if (itemlocal) {
        carrito = JSON.parse(itemlocal);
        precio = parseFloat(preciolocal);
        total.textContent = precio.toFixed(2);

        actualizar();
    }
}

function vaciar2() {
    cuerpo.innerHTML = "";
    cuenta.textContent = "0";
    precio = 0;
    carrito = [];
    localStorage.removeItem("articulos");
    localStorage.removeItem("precio");
    total.textContent = "0.00";
}

botones = document.querySelectorAll(".catalogo .producto button");
botones.forEach(function (btn) {
    btn.addEventListener("click", Anadir);
});
