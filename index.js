// Obtener referencias a los elementos del DOM
var sol = document.getElementById('temaSwitch1');
var luna = document.getElementById('temaSwitch2');
var body = document.querySelector('.body');
var input = document.querySelector('.input-task');
var addBtn = document.querySelector('.new-todo .add-btn');
var container = document.querySelector('.container');
var clear = document.getElementById('clear');

// Cargar tema almacenado al cargar la página
window.addEventListener('load', function () {
    cargarTema(); // Cargar el tema primero
    loadTasks(); // Cargar las tareas después
});

// Cambiar tema
sol.addEventListener('click', cambiarTema);
luna.addEventListener('click', cambiarTema);

// Funciones relacionadas con el tema
function cambiarTema() {
    sol.classList.toggle('hidden');
    luna.classList.toggle('hidden');
    body.classList.toggle('color');
    
    // Guardar el tema después de cambiarlo
    guardarTema();
    saveTasks();
}

function guardarTema() {
    var tema = body.classList.contains('color') ? 'color' : '';
    localStorage.setItem('tema', tema);
}

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

// Funciones relacionadas con las tareas
function contarTaskDivs() {
    var totalTaskDivs = document.querySelectorAll('.task-div:not(.active)').length;
    document.querySelector('.total-task').textContent = totalTaskDivs;
}

function addTask() {
    var value = input.value.trim();
    if (value !== '' && value !== '0') {
        var capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        createTaskElement(capitalizedValue);
        input.value = '';
        contarTaskDivs();
        saveTasks(); // Guardar la lista después de agregar una tarea
    }
}

function createTaskElement(taskText) {
    var newDiv = document.createElement('div');
    newDiv.classList.add('task-div', 'brorder-bottom');
    var checkIcon = document.createElement('img');
    checkIcon.src = 'images/icon-check.svg';
    checkIcon.alt = 'check';
    var taskTextElement = document.createElement('p');
    taskTextElement.textContent = taskText;

    taskTextElement.onclick = function () {
        toggleActiveState(newDiv);
    };

    var crossIcon = document.createElement('img');
    crossIcon.classList.add('cross');
    crossIcon.src = 'images/icon-cross.svg';
    crossIcon.alt = 'cross';

    crossIcon.addEventListener('click', function () {
        newDiv.remove();
        contarTaskDivs();
        saveTasks(); // Guardar la lista después de eliminar una tarea
    });

    checkIcon.onclick = function () {
        toggleActiveState(newDiv);
    };

    newDiv.appendChild(checkIcon);
    newDiv.appendChild(taskTextElement);
    newDiv.appendChild(crossIcon);

    container.appendChild(newDiv);
}

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

function loadTasks() {
    var storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        var tasks = JSON.parse(storedTasks);

        tasks.forEach(function (task) {
            createTaskElement(task.text);

            var lastTaskDiv = document.querySelector('.task-div:last-child');
            if (task.active) {
                toggleActiveState(lastTaskDiv);
            }
        });

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

clear.addEventListener('click', function () {
    var taskDivs = document.querySelectorAll('.task-div.active');
    taskDivs.forEach(function (taskDiv) {
        taskDiv.remove();
    });

    contarTaskDivs();
    saveTasks();
});

// Asigna eventos de clic a los elementos <p>
document.getElementById('all').addEventListener('click', function () {
    mostrarTodasLasTareas();
});

document.getElementById('active').addEventListener('click', function () {
    mostrarTareasActivas();
});

document.getElementById('completed').addEventListener('click', function () {
    mostrarTareasCompletadas();
});

// Función para mostrar todas las tareas
function mostrarTodasLasTareas() {
    var taskDivs = document.querySelectorAll('.task-div');
    taskDivs.forEach(function (taskDiv) {
        taskDiv.style.display = 'flex';
    });
}

// Función para mostrar solo tareas activas
function mostrarTareasActivas() {
    var taskDivs = document.querySelectorAll('.task-div');
    taskDivs.forEach(function (taskDiv) {
        if (taskDiv.classList.contains('active')) {
            taskDiv.style.display = 'none';
        } else {
            taskDiv.style.display = 'flex';
        }
    });
}

// Función para mostrar solo tareas completadas
function mostrarTareasCompletadas() {
    var taskDivs = document.querySelectorAll('.task-div');
    taskDivs.forEach(function (taskDiv) {
        if (taskDiv.classList.contains('active')) {
            taskDiv.style.display = 'flex';
        } else {
            taskDiv.style.display = 'none';
        }
    });
}

var sortable = new Sortable(container, {
    animation: 150,
    handle: '.task-div',
    onEnd: function (evt) {
        contarTaskDivs();
        saveTasks(); // Guardar la lista después de cambiar el orden
    },
});

// Evento beforeunload para guardar el estado antes de recargar la página
window.addEventListener('beforeunload', function() {
    guardarTema();
    saveTasks();
});
