//VARIABLES

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulos = [];

listeners();
function listeners() {
    //Cuando presionen "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar del carrito

    carrito.addEventListener('click', eliminarCurso);

    //Local Storage

    document.addEventListener('DOMContentLoaded', () =>{
        articulos = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    } );


    //Vaciar carrito

    vaciarCarrito.addEventListener('click', () => {
        articulos = []; // se resetea el arreglo

        limpiarHTML(); //eliminamos todo el HTML
    })

}



//FUNCIONES

function agregarCurso(e) {

    e.preventDefault()

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoAgregado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoAgregado);
    }
}

//Elimina curso del carrito
function eliminarCurso(e) {
    console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo "Articulos" por el data-id

        articulos = articulos.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}

function leerDatosCurso(curso) {
    console.log(curso);

    const informacionCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
    //Revisa si un elemento ya existe en el carrito
    const existe = articulos.some(curso => curso.id === informacionCurso.id);

    if (existe) {
        //Actualiza la cantidad
        const cantidad = articulos.map(curso => {
            if (curso.id === informacionCurso.id) {
                curso.cantidad++;
                return curso; //retorna los articulos repetidos con la cantidad actualizada
            }
            else {
                return curso; //retorna la primer copia de los elementos 
            }
        })
        articulosEnElCarrito = [...cantidad];
    } else {
        //Agrega los elementos al carrito
        articulosEnElCarrito = articulos.push(informacionCurso);

    }
    console.log(articulosEnElCarrito);
    carritoHTML();
}

//Mostrar carrito en el HTML

function carritoHTML() {

    //Limpiar HTML para que solo muestre una copia de cada elemento

    limpiarHTML();


    //HTML ya limpio 

    articulos.forEach(curso => {
        const row = document.createElement('tr');
        const { imagen, titulo, precio, cantidad, id } = curso;
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="150">
        </td>
        
        <td>
            ${titulo}
        </td>

        <td>
            ${precio}
        </td>

        <td>
            ${cantidad}
        </td>

        <td>
           <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        //Lo agrega al tbody

        contenedorCarrito.appendChild(row);
    });

    //Local storage

    vincularStorage();
}

function vincularStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulos));
}

//Limpieza

function limpiarHTML() {
    contenedorCarrito.innerHTML = '';
}