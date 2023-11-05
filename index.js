// Obtener referencias a los elementos del DOM
var sol = document.getElementById('temaSwitch1');
var luna = document.getElementById('temaSwitch2');
var body = document.querySelector('.body');
var input = document.querySelector('.input-task');
var addBtn = document.querySelector('.new-todo .add-btn');
var container = document.querySelector('.container');

// Cargar tareas almacenadas al cargar la página
window.addEventListener('load', function () {
    loadTasks();
});

// Cambiar tema
sol.addEventListener('click', function () {
    body.classList.toggle('color');
});
luna.addEventListener('click', function () {
    body.classList.toggle('color');
});

function cambiarTema() {
    sol.classList.toggle('hidden');
    luna.classList.toggle('hidden');
}

// Función para agregar una tarea
function addTask() {
    var value = input.value.trim();

    if (value !== '' && value !== '0') {
        var capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        createTaskElement(capitalizedValue);
        input.value = '';
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

    var crossIcon = document.createElement('img');
    crossIcon.classList.add('cross');
    crossIcon.src = 'images/icon-cross.svg';
    crossIcon.alt = 'cross';

    crossIcon.addEventListener('click', function () {
        newDiv.remove();
        saveTasks(); // Guardar la lista después de eliminar una tarea
    });

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
        tasks.push(taskDiv.querySelector('p').textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar las tareas desde localStorage
function loadTasks() {
    var storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        var tasks = JSON.parse(storedTasks);

        tasks.forEach(function (task) {
            createTaskElement(task);
        });
    }
}

// Asociar funciones a eventos
sol.addEventListener('click', cambiarTema);
luna.addEventListener('click', cambiarTema);
addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});