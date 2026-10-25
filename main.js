
const cuerpo = document.body;
const articulo = document.querySelector('main');

// índice automático
const indice = document.querySelector('#indice');
const titulosArticulo = document.querySelectorAll('main h2');

// panel Apariencia
const botonModo = document.querySelector('#boton-modo');
const botonPequeno = document.querySelector('#boton-pequeno');
const botonEstandar = document.querySelector('#boton-estandar');
const botonGrande = document.querySelector('#boton-grande');
const botonesTamano = [botonPequeno, botonEstandar, botonGrande];

// discusión
const formularioComentario = document.querySelector('#formulario-comentario');
const campoNombre = document.querySelector('#nombre-comentario');
const campoComentario = document.querySelector('#texto-comentario');
const contadorComentario = document.querySelector('#contador-comentario');
const avisoComentario = document.querySelector('#aviso-comentario');
const listaComentarios = document.querySelector('#lista-comentarios');

const MINIMO = 10;
const MAXIMO = 200;
titulosArticulo.forEach(function (titulo) {
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

botonPequeno.addEventListener('click', function () {
    aplicarTamano('texto-pequeno', botonPequeno);
});

botonEstandar.addEventListener('click', function () {
    aplicarTamano('', botonEstandar);
});

botonGrande.addEventListener('click', function () {
    aplicarTamano('texto-grande', botonGrande);
});

articulo.addEventListener('click', function (e) {
    const titulo = e.target.closest('h2');

    if (titulo === null) {
        return;
    }

    titulo.closest('section').classList.toggle('plegada');
});

campoComentario.addEventListener('input', function () {
    actualizarContador();
});

formularioComentario.addEventListener('submit', function (e) {
    e.preventDefault();

    
    avisoComentario.textContent = '';
    campoNombre.classList.remove('error');
    campoComentario.classList.remove('error');

    const nombre = campoNombre.value.trim();
    const comentario = campoComentario.value.trim();
    const mensajes = [];

    if (nombre === '') {
        mensajes.push('El nombre no puede estar vacío.');
        campoNombre.classList.add('error');
    }

    if (comentario.length < MINIMO || comentario.length > MAXIMO) {
        mensajes.push(`El comentario debe tener entre ${MINIMO} y ${MAXIMO} caracteres.`);
        campoComentario.classList.add('error');
    }

    if (mensajes.length > 0) {
        avisoComentario.textContent = mensajes.join(' ');
        return; 
    }

    crearComentario(nombre, comentario);

    
    formularioComentario.reset();
    actualizarContador();
});


listaComentarios.addEventListener('click', function (e) {
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.remove(); 
    }
});


function aplicarTamano(clase, botonElegido) {
    articulo.classList.remove('texto-pequeno', 'texto-grande');

    if (clase !== '') {
        articulo.classList.add(clase);
    }

    botonesTamano.forEach(function (boton) {
        boton.classList.remove('activo');
    });
    botonElegido.classList.add('activo');
}

function actualizarContador() {
    const usados = campoComentario.value.length;

    contadorComentario.textContent = `${usados} / ${MAXIMO}`;

    if (usados > MAXIMO) {
        contadorComentario.classList.add('error');
    } else {
        contadorComentario.classList.remove('error');
    }
}

function crearComentario(nombre, texto) {
    const item = document.createElement('li');

    const autor = document.createElement('strong');
    autor.textContent = nombre;

    const contenido = document.createElement('p');
    contenido.textContent = texto;

    const borrar = document.createElement('button');
    borrar.type = 'button';
    borrar.textContent = 'Borrar';
    borrar.classList.add('borrar');

    item.append(autor);
    item.append(contenido);
    item.append(borrar);
    listaComentarios.append(item);
}