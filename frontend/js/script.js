const buttons = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('.card');
const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
    member.addEventListener('click', () => {
        const targetId = member.getAttribute('data-target');
        document.querySelector(`.tab-btn[data-target="${targetId}"]`).click();
    });
});


buttons.forEach(button => {
    button.addEventListener('click', () => {

        buttons.forEach(btn => btn.classList.remove('active'));
        cards.forEach(card => card.classList.add('hidden'));

        button.classList.add('active');

        const targetId = button.getAttribute('data-target');

        const targetCard = document.getElementById(targetId);
        targetCard.classList.remove('hidden');
    });
});


teamMembers.forEach(member => {
    member.addEventListener('click', () => {
        const targetId = member.getAttribute('data-target');
        const targetButton = document.querySelector(`.tab-btn[data-target="${targetId}"]`);
        if (targetButton) targetButton.click();
    });
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        cards.forEach(card => card.classList.add('hidden'));

        button.classList.add('active');

        const targetId = button.getAttribute('data-target');
        const targetCard = document.getElementById(targetId);
        if (targetCard) targetCard.classList.remove('hidden');
    });
});



teamMembers.forEach(member => {
    member.addEventListener('click', () => {
        const targetId = member.getAttribute('data-target');
        const targetButton = document.querySelector(`.tab-btn[data-target="${targetId}"]`);
        if (targetButton) targetButton.click();
    });
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        cards.forEach(card => card.classList.add('hidden'));

        button.classList.add('active');

        const targetId = button.getAttribute('data-target');
        const targetCard = document.getElementById(targetId);
        if (targetCard) targetCard.classList.remove('hidden');
    });
});


/* ==============================
   Task 1: работа с DOM
   ============================== */

const task1Output = document.getElementById('task1-output');

// 1. Найти элемент по ID и изменить текст
const btnChangeText = document.getElementById('btn-change-text');
const targetTitle = document.getElementById('target-title');

btnChangeText.addEventListener('click', () => {
    targetTitle.textContent = 'Привет, мир!';
});

// 2. Создать новый div с классом new-div, кнопка исчезает после использования
const btnCreateDiv = document.getElementById('btn-create-div');

btnCreateDiv.addEventListener('click', () => {
    const newDiv = document.createElement('div');
    newDiv.className = 'new-div';
    newDiv.textContent = 'Я новый элемент';
    task1Output.appendChild(newDiv);

    btnCreateDiv.remove();
});

// 3. Удалить элемент с классом old-element
const btnRemoveOld = document.getElementById('btn-remove-old');

btnRemoveOld.addEventListener('click', () => {
    const oldElement = document.querySelector('.old-element');
    if (oldElement) {
        oldElement.remove();
    }
});

// 4-5. Создать изменяемый абзац, кнопка исчезает после использования.
// Кнопка стиля остаётся навсегда и переключает красный/жирный текст при каждом клике (спамить можно бесконечно)
const btnCreateParagraph = document.getElementById('btn-create-paragraph');

btnCreateParagraph.addEventListener('click', () => {
    const editableParagraph = document.createElement('p');
    editableParagraph.className = 'editable-paragraph';
    editableParagraph.textContent = 'Это изменяемый абзац.';
    task1Output.appendChild(editableParagraph);

    const editBtn = document.createElement('button');
    editBtn.className = 'task-btn';
    editBtn.textContent = 'Изменить стиль абзаца';
    task1Output.appendChild(editBtn);

    const toggleStyle = () => {
        editableParagraph.classList.toggle('editable-paragraph--active');
    };

    editableParagraph.addEventListener('click', toggleStyle);
    editBtn.addEventListener('click', toggleStyle);

    btnCreateParagraph.remove();
});


/* ==============================
   Task 2: управление классами
   ============================== */

const demoBox = document.getElementById('demo-box');

demoBox.addEventListener('dblclick', () => {
    demoBox.classList.toggle('active');

    const classListArray = Array.from(demoBox.classList);
    console.log('Классы demo-box:', classListArray);

    let classesInfo = document.getElementById('classes-info');
    if (!classesInfo) {
        classesInfo = document.createElement('p');
        classesInfo.id = 'classes-info';
        classesInfo.className = 'classes-info';
        demoBox.insertAdjacentElement('afterend', classesInfo);
    }
    classesInfo.textContent = 'Классы: ' + classListArray.join(', ');
});