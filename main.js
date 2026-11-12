const cuerpo = document.body;
const articulo = document.querySelector('main');
const titulos = document.querySelectorAll('main h2');
const secciones = document.querySelectorAll('main section');

const indice = document.querySelector('#indice');

const botonModo = document.querySelector('#boton-modo');
const botonPequeno = document.querySelector('#boton-pequeno');
const botonEstandar = document.querySelector('#boton-estandar');
const botonGrande = document.querySelector('#boton-grande');
const botonesTamano = [botonPequeno, botonEstandar, botonGrande];

const formulario = document.querySelector('#formulario-comentario');
const campoNombre = document.querySelector('#nombre-comentario');
const campoComentario = document.querySelector('#texto-comentario');
const contador = document.querySelector('#contador-comentario');
const aviso = document.querySelector('#aviso-comentario');
const listaComentarios = document.querySelector('#lista-comentarios');

const MINIMO = 10;
const MAXIMO = 200;


titulos.forEach(function (titulo) {
    const item = document.createElement('li');
    const enlace = document.createElement('a');
    enlace.href = `#${titulo.id}`;
    enlace.textContent = titulo.textContent;
    item.append(enlace);
    indice.append(item);
});


botonModo.addEventListener('click', function () {
    cuerpo.classList.toggle('oscuro');
    if (cuerpo.classList.contains('oscuro')) {
        botonModo.textContent = 'Modo claro';
    } else {
        botonModo.textContent = 'Modo oscuro';
    }
});


function elegirTamano(clase, botonElegido) {
    articulo.classList.remove('texto-pequeno');
    articulo.classList.remove('texto-estandar');
    articulo.classList.remove('texto-grande');
    articulo.classList.add(clase);

    botonesTamano.forEach(function (boton) {
        boton.classList.remove('activo');
    });
    botonElegido.classList.add('activo');
}

botonPequeno.addEventListener('click', function () {
    elegirTamano('texto-pequeno', botonPequeno);
});

botonEstandar.addEventListener('click', function () {
    elegirTamano('texto-estandar', botonEstandar);
});

botonGrande.addEventListener('click', function () {
    elegirTamano('texto-grande', botonGrande);
});

secciones.forEach(function (seccion) {
    const titulo = seccion.querySelector('h2');
    const contenido = seccion.querySelector('.contenido');

    
    const flecha = document.createElement('span');
    flecha.textContent = '▾ ';
    titulo.prepend(flecha);

    titulo.addEventListener('click', function () {
        contenido.classList.toggle('oculto');
        if (contenido.classList.contains('oculto')) {
            flecha.textContent = '▸ ';
        } else {
            flecha.textContent = '▾ ';
        }
    });
});


function actualizarContador() {
    const usados = campoComentario.value.length;
    contador.textContent = `${usados} / ${MAXIMO}`;
}

campoComentario.addEventListener('input', actualizarContador);

function crearComentario(nombre, texto) {
    const item = document.createElement('li');

    const autor = document.createElement('strong');
    autor.textContent = nombre;

    const contenido = document.createElement('p');
    contenido.textContent = texto;

    const borrar = document.createElement('button');
    borrar.textContent = 'Borrar';
    borrar.classList.add('borrar');

    item.append(autor);
    item.append(contenido);
    item.append(borrar);
    listaComentarios.append(item);
}

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    aviso.textContent = '';
    campoNombre.classList.remove('error');
    campoComentario.classList.remove('error');

    const nombre = campoNombre.value.trim();
    const comentario = campoComentario.value.trim();

    if (nombre === '') {
        aviso.textContent = 'El nombre no puede estar vacío';
        campoNombre.classList.add('error');
        return;
    }

    if (comentario.length < MINIMO || comentario.length > MAXIMO) {
        aviso.textContent = `El comentario tiene que tener entre ${MINIMO} y ${MAXIMO} caracteres`;
        campoComentario.classList.add('error');
        return;
    }

    crearComentario(nombre, comentario);
    formulario.reset();
    actualizarContador();
});

listaComentarios.addEventListener('click', function (e) {
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.remove();
    }
});