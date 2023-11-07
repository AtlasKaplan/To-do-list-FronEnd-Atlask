// Obtener referencias a los elementos del DOM
var sol = document.getElementById('temaSwitch1');
var luna = document.getElementById('temaSwitch2');
var body = document.querySelector('.body');
var input = document.querySelector('.input-task');
var addBtn = document.querySelector('.new-todo .add-btn');
var container = document.querySelector('.container');

// Cargar tema almacenado al cargar la página
window.addEventListener('load', function () {
    cargarTema(); // Cargar el tema primero
    loadTasks(); // Cargar las tareas después
});

// Cambiar tema
sol.addEventListener('click', function () {
    cambiarTema();
});

luna.addEventListener('click', function () {
    cambiarTema();
});

// Función para cambiar el tema
function cambiarTema() {
    sol.classList.toggle('hidden');
    luna.classList.toggle('hidden');
    body.classList.toggle('color');
    
    // Guardar el tema después de cambiarlo
    guardarTema();
    saveTasks();
}

// Función para guardar el estado del tema en localStorage
function guardarTema() {
    var tema = body.classList.contains('color') ? 'color' : '';
    localStorage.setItem('tema', tema);
}

// Función para cargar el estado del tema desde localStorage
// Función para cargar el estado del tema desde localStorage
function cargarTema() {
    var storedTema = localStorage.getItem('tema');
    if (storedTema === 'color') {
        body.classList.add('color');
        sol.classList.add('hidden');
        luna.classList.remove('hidden');
    } else {
        body.classList.remove('color');
        luna.classList.add('hidden');
        sol.classList.remove('hidden');
    }
}


function contarTaskDivs() {
    // Obtén la cantidad de elementos con la clase 'task-div' que no tienen la clase 'active'
    var totalTaskDivs = document.querySelectorAll('.task-div:not(.active)').length;

    // Actualiza el contenido del elemento con la clase 'total-task'
    document.querySelector('.total-task').textContent = totalTaskDivs;
}



// Función para agregar una tarea
function addTask() {
    var value = input.value.trim();

    if (value !== '' && value !== '0') {
        var capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        createTaskElement(capitalizedValue);
        input.value = '';
        contarTaskDivs()
        saveTasks(); // Guardar la lista después de agregar una tarea
    }
}

// Función para crear un elemento de tarea
function createTaskElement(taskText) {
    var newDiv = document.createElement('div');
    newDiv.classList.add('task-div', 'brorder-bottom');

    var checkIcon = document.createElement('img');
    checkIcon.src = 'images/icon-check.svg';
    checkIcon.alt = 'check';

    var taskTextElement = document.createElement('p');
    taskTextElement.textContent = taskText;

    // Agrega el evento onclick al elemento taskTextElement
    taskTextElement.onclick = function () {
        toggleActiveState(newDiv);
    };

    var crossIcon = document.createElement('img');
    crossIcon.classList.add('cross');
    crossIcon.src = 'images/icon-cross.svg';
    crossIcon.alt = 'cross';

    // Agrega el evento onclick al elemento crossIcon
    crossIcon.addEventListener('click', function () {
        newDiv.remove();
        contarTaskDivs();
        saveTasks(); // Guardar la lista después de eliminar una tarea
    });

    // Agrega el evento onclick al elemento checkIcon
    checkIcon.onclick = function () {
        toggleActiveState(newDiv);
    };

    newDiv.appendChild(checkIcon);
    newDiv.appendChild(taskTextElement);
    newDiv.appendChild(crossIcon);

    container.appendChild(newDiv);
}

// Función para guardar las tareas en localStorage
function saveTasks() {
    var tasks = [];
    var taskDivs = document.querySelectorAll('.task-div');

    taskDivs.forEach(function (taskDiv) {
        tasks.push({
            text: taskDiv.querySelector('p').textContent,
            active: taskDiv.classList.contains('active')
        });
    });


    localStorage.setItem('tasks', JSON.stringify(tasks));
    guardarTema();
}

// Función para cargar las tareas desde localStorage
function loadTasks() {
    var storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        var tasks = JSON.parse(storedTasks);

        tasks.forEach(function (task) {
            createTaskElement(task.text);

            // Aplicar el estado active si es necesario
            var lastTaskDiv = document.querySelector('.task-div:last-child');
            if (task.active) {
                toggleActiveState(lastTaskDiv);
            }
        });

        // Asegúrate de contar las tareas después de cargarlas
        contarTaskDivs();
    }
}

function toggleActiveState(element) {
    element.classList.toggle('active');
    contarTaskDivs();
    saveTasks();
}

// Asociar funciones a eventos
addBtn.addEventListener('click', function () {
    addTask();

    contarTaskDivs();
    saveTasks();
});

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();

        contarTaskDivs();
        saveTasks();
    }
});



// boton clear
var clear = document.getElementById('clear');
clear.addEventListener('click', function () {
    var taskDivs = document.querySelectorAll('.task-div.active');
    taskDivs.forEach(function (taskDiv) {
        taskDiv.remove();
    });
    // Llama a contarTaskDivs después de eliminar tareas y guarda el estado actualizado
    contarTaskDivs();
    saveTasks();
});

// Evento beforeunload para guardar el estado antes de recargar la página
window.addEventListener('beforeunload', function() {
    guardarTema();
    saveTasks();
});