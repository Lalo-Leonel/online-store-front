//Definición de variables
const hostApi = 'https://backonlinestore.herokuapp.com/'
const url = hostApi+'api/products'
const urlCategories = hostApi+'api/categories'
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const inputBuscar = document.getElementById('buscar')
const celdas = document.getElementsByTagName('h5')
const select = document.querySelector("#miSelect");

let valueSearch = ""
let valueSelect = "all"

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

//funcion para mostrar las categorias
const mostrarCategorias = (elements) => {

    elements.forEach(element => {
        const option = document.createElement('option');
        
        option.value = element.id;
        option.text = element.name;
        select.appendChild(option);
    })

}

//Procedimiento Mostrar los productos
fetch(url)
    .then(response => response.json())
    .then(data => {
        mostrar(data.products)
    })
    .catch(error => console.log(error))

//Procedimiento Mostrar las categorias
fetch(urlCategories)
    .then(response => response.json())
    .then(data => {
        mostrarCategorias(data.categories)
    })
    .catch(error => console.log(error))


//Búsqueda
inputBuscar.addEventListener('keyup', (e)=>{
    let texto = e.target.value
    valueSearch = texto
    const urlById = hostApi+'api/products/search?name='+texto+'&categoryId='+valueSelect
    fetch(urlById)
    .then(response => response.json())
    .then(data => {
        mostrar(data.products)
    })
    .catch(error => console.log(error))
    
})
select.addEventListener('change', (e)=>{
    let id = e.target.value
    valueSelect = id
    const urlById = hostApi+'api/products/search?name='+valueSearch+'&categoryId='+id
    fetch(urlById)
    .then(response => response.json())
    .then(data => {
        mostrar(data.products)
    })
    .catch(error => console.log(error))
})
