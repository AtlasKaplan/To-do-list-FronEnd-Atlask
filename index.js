
var sol = document.getElementById('temaSwitch1');
var luna = document.getElementById('temaSwitch2');
var body = document.querySelector('.body');

sol.addEventListener('click', function () {

    body.classList.toggle('color');
});
luna.addEventListener('click', function () {

    body.classList.toggle('color');
});

function cambiarTema() {


  // Toggle classes
    sol.classList.toggle('hidden');
    luna.classList.toggle('hidden');
}


var input = document.querySelector('.input-task');

