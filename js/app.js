// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Eventos
eventListeners();

function eventListeners(){
        formulario.addEventListener('submit', agregarTweet);

        document.addEventListener('DOMContentLoaded', () => {
                tweets = JSON.parse(localStorage.getItem('tweets')) || [];

                crearHTML();
        });

}


// Funciones
function agregarTweet(e){
        e.preventDefault();
        
        const tweet = document.querySelector('#tweet').value;
        
        // Validación
        if(tweet === ''){
                mostrarError('Un mensaje no puede ir vacío');
                return;
        }

        const tweetObj = {
                id: Date.now(),
                texto: tweet
        }

        tweets = [...tweets, tweetObj];
        
        crearHTML();

        formulario.reset();


}

// Mostrar error
function mostrarError(error){
        const mensajeError = document.createElement('p');
        mensajeError.textContent = error;
        mensajeError.classList.add('error');

        const contenido = document.querySelector('#contenido');
        contenido.appendChild(mensajeError);

        setTimeout( () => {
                mensajeError.remove();
        }, 3000)
}

// Crear HTML
function crearHTML() {
        limpiarHTML();

        if(tweets.length > 0){
                tweets.forEach( tweet => {

                        const btnEliminar = document.createElement('a');
                        btnEliminar.classList.add('borrar-tweet');
                        btnEliminar.innerHTML = 'X';

                        btnEliminar.onclick = () => {
                                borrarTweet(tweet.id);
                        }

                        const li = document.createElement('li');

                        li.innerText = tweet.texto;

                        li.appendChild(btnEliminar);

                        listaTweets.appendChild(li);
                })
        }

        sincronizarStorage();
}

function sincronizarStorage() {
        localStorage.setItem('tweets', JSON.stringify(tweets));
}



// Limpiar HTML
function limpiarHTML() {
        while(listaTweets.firstChild){
                listaTweets.removeChild(listaTweets.firstChild);
        }
}

// Eliminar Tweet
function borrarTweet(id) {
        tweets = tweets.filter( tweet => tweet.id !== id);

        crearHTML();
}