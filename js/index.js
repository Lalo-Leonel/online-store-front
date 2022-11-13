//Definición de variables
const url = 'http://localhost:8000/api/products'
const urlSearch = 'http://localhost:8000/api/products/search?name='
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const inputBuscar = document.getElementById('buscar')
const celdas = document.getElementsByTagName('h5')

//funcion para mostrar los productos
const mostrar = (elements) => {
    document.getElementById('items').innerHTML = ""
    elements.forEach(element => {
        templateCard.querySelector('h5').textContent = element.name
        templateCard.querySelector('img').src = element.url_image
        templateCard.querySelector('h6').textContent = element.price
        const clone = templateCard.cloneNode(true)      
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

}

//Procedimiento Mostrar
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        mostrar(data.products)
    })
    .catch(error => console.log(error))

//Búsqueda
inputBuscar.addEventListener('keyup', (e)=>{
    let texto = e.target.value
    console.log(texto)
    fetch(urlSearch+texto)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        mostrar(data.products)
    })
    .catch(error => console.log(error))
    // let er = new RegExp(texto, "i")
    // for(let i=0; i<celdas.length; i++) {
    //     let valor = celdas[i]
    //     console.log(valor)
    //     if(er.test(valor.innerText)){
    //         valor.classList.remove("ocultar")
    //     }else{
    //         console.log(valor)
    //         valor.classList.add("ocultar")
    //     }
    // }
})
