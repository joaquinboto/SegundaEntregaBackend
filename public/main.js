const form = document.getElementById('formulario')
const gridContainer = document.querySelector('.grid-container')
const modalEdit = document.getElementById('modalEdit')
const btnClose = document.getElementById('btnClose')

const API_PRODUCT = 'api/productos/'

form.addEventListener('submit' , (e) => {
    e.preventDefault()
    const producto = createProduct(e)
    fetch( API_PRODUCT , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
})

function createProduct (event) {
    
    const elements = event.target.elements
    let registro = new Date().getTime()
    fetchProductos()
    return {
        name: elements.name.value,
        cantidad: elements.cantidad.value,
        img: elements.imagen.value,
        precio: elements.precio.value,
        timestipe: registro
    }

    

}

//Llamar productos
const fetchProductos = () => {
    fetch(API_PRODUCT)
    .then(response => response.json())
    .then(data => renderProductos(data))
}

//Render productos
const renderProductos = (data) => {
    gridContainer.innerHTML = ''
    data.forEach(producto => {

        gridContainer.innerHTML += `
        <div class="cardProducto">
        <img class="card-img-top" src="${producto.img}" alt="">
        <div class="cardBody">
            <span class="card-title">
                ${producto.name}
            </span>
            <strong class="card-text">
              $${producto.precio}
            </strong>
            <button onclick="sendCart(${producto.id})" class="cta">
                <span class="hover-underline-animation">Shop now</span>
                <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 46 16">
                  <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)"></path>
                </svg>
              </button>
              <button class="btnPop btn btn-primary" onclick="openModal(${producto.id})">Editar</button>
              <button class="btn btn-danger" onclick="deleteProduct(${producto.id})">Eliminar</button>
        </div>
    </div>
        `

        
    })

}

fetchProductos()


const openModal = (id) => {
    fetch(API_PRODUCT)
    .then(res => res.json())
    .then(data => renderModal(data, id))
}

const renderModal = (data , id ) => {
    let product = {}
    data.filter(p=>{
        if (p.id == id) {
            product = p
        }
    })
    document.querySelector('#formEdit #ID').value = product.id;
    document.querySelector('#formEdit #name').value = product.name;
    document.querySelector('#formEdit #cantidad').value = product.cantidad;
    document.querySelector('#formEdit #precio').value = product.precio;
    document.querySelector('#formEdit #imagen').value = product.img

    openModalEdit()
}

const updateProduct = () => {
    const product = {
        id: document.querySelector('#formEdit #ID').value ,
        name: document.querySelector('#formEdit #name').value ,
        cantidad: document.querySelector('#formEdit #cantidad').value,
        precio: document.querySelector('#formEdit #precio').value,
        img: document.querySelector('#formEdit #imagen').value
    }
    fetch(API_PRODUCT , {
        method: 'PUT' ,
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then(res => res.json())
    .then(data => {
        data.mensaje
        fetchProductos()
    })
    document.querySelector('#formEdit').reset()
    
}

const deleteProduct = (id) => {
    fetch(`${API_PRODUCT}${id}` , {
        method: 'DELETE'
    })
    .then(r => r.json())
    .then(r => {
        r.mensaje
        fetchProductos()
    })
}


const openModalEdit = () => {
    modalEdit.style.display = 'block';
  }

  btnClose.addEventListener('click' , () => {
    modalEdit.style.display = 'none'
  })


const renderCarrito = () => {
    fetch('/api/carrito')
    .then(res => res.json())
    .then(data => {
        renderProductosEnCarro(data)
    })
}



renderCarrito()

const renderProductosEnCarro = (data) => {

    if (data.length > 0) {

    data[0].productos.map(p=> {
        document.getElementById('productos').innerHTML += `
        <tr>
        <td><img src="${p.img}" width="100px" alt=""></td>
        <td>${p.name}</td>
        <td>${p.cantidad}</td>
        <td>${p.precio}</td>
    </tr>
        `
    })} else {
        document.getElementById('productos').innerHTML = `
        <tr>
        <td>No hay productos en el carrito</td>
    </tr>
        `
    }

  }