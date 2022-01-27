import { url as endpoint } from "./url.js"
const ul = document.querySelector('.list-group')
const form = document.querySelector('.form-group')
const btnBuscar = document.getElementById('btnCorreo')
const btnModificar = document.getElementById('btnModificar')
const getUser = async () => {
    const resp = await fetch(endpoint)
    const data = await resp.json()
    data.forEach(element => {
        const { id, name, image } = element
        ul.innerHTML += `
        <li class="list-group-item">
            <span class="lead">${name}</span>
            <img src=${image} width="50px"></img>
            <button id=${id} class="btn btn-dark btn-sm float-end">
                Borrar
            </button>
        </li>
        `
    })
}
document.addEventListener('DOMContentLoaded', getUser)
ul.addEventListener('click', e => {
    const btnEliminar = e.target.classList.contains('btn-dark')
    if (btnEliminar) {
        const id = e.target.id;
        fetch(endpoint + id, {
            method: 'DELETE'
        }
        )

    }

})
const capturarDatos = () => {


    const image = document.getElementById('inputUrl').value
    const name = document.getElementById('inputName').value



    const user = {
        image,
        name,


    }
    return user
}

form.addEventListener('submit', async e => {
    e.preventDefault()
    const objeto = capturarDatos()
    await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
})

//buscar por correo
btnBuscar.addEventListener('click', async e => {
    const input = document.getElementById('char').value
    const resp = await fetch(endpoint)
    const data = await resp.json()

    const buscado = data.find(u => u.name.toLocaleLowerCase() === input.toLocaleLowerCase())
    if (buscado !== undefined) {
        const { id, name, image } = buscado
        document.getElementById('inputUrl').value = image
        document.getElementById('inputName').value = name


        document.getElementById('inputId').value = id


    } else {
        alert("char not found")
    }
})
btnModificar.addEventListener('click', async () => {
    const dataModificar = capturarDatos()
    const { name, url } = dataModificar
    if (url === '', name === '') {
        alert("llenar todos los campos")
    } else {
        const id = document.getElementById('inputId').value
        await fetch(endpoint + id, {
            method: 'PUT',
            body: JSON.stringify(dataModificar),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }

        })
    }
})