//Definición de variables
const url = 'http://localhost:8000/api/products'
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let products = ''

//funcion para mostrar los productos
const mostrar = (elements) => {
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
