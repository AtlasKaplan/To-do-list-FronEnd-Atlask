
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
    sol.classList.toggle('hidden');
    luna.classList.toggle('hidden');
};






var input = document.querySelector('.input-task');
var addBtn = document.querySelector('.new-todo .add-btn');

function addTask() {
    var value = input.value.trim();

    if (value !== '' && value !== '0') {
        var capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

        var newDiv = document.createElement('div');

        newDiv.classList.add('task-div', 'brorder-bottom');

        var checkIcon = document.createElement('img');
        checkIcon.src = 'images/icon-check.svg';
        checkIcon.alt = 'check';

        var taskText = document.createElement('p');
        taskText.textContent = capitalizedValue;

        var crossIcon = document.createElement('img');
        crossIcon.classList.add('cross');
        crossIcon.src = 'images/icon-cross.svg';
        crossIcon.alt = 'cross';

        crossIcon.addEventListener('click', function () {
            newDiv.remove();
        });

        newDiv.appendChild(checkIcon);
        newDiv.appendChild(taskText);
        newDiv.appendChild(crossIcon);

        document.querySelector('.container').appendChild(newDiv);

        input.value = '';

    };
};

addBtn.addEventListener('click', addTask);

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    };
});


