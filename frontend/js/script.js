const buttons = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('.card');
const teamMembers = document.querySelectorAll('.team-member');
const domDemoPanel = document.getElementById('dom-demo-panel');

// Скрываем панель по умолчанию (активна вкладка "Команда")
domDemoPanel.classList.add('hidden');

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

        // Показываем DOM DEMO только на вкладке Task 1
        if (targetId === 'task1') {
            domDemoPanel.classList.remove('hidden');
        } else {
            domDemoPanel.classList.add('hidden');
        }
    });
});

/* ==============================
   Отдельная панель: создать → изменить → удалить
   ============================== */

const domDemoElement = document.getElementById('dom-demo-element');
const btnCreateElement = document.getElementById('btn-create-element');
const btnChangeElementText = document.getElementById('btn-change-element-text');
const btnDeleteElement = document.getElementById('btn-delete-element');

// 1. Создать элемент
btnCreateElement.addEventListener('click', () => {
    if (document.getElementById('created-demo-item')) return;

    const item = document.createElement('div');
    item.id = 'created-demo-item';
    item.className = 'new-div';
    item.textContent = 'Я новый элемент';
    document.body.appendChild(item);
});

// 2. Изменить текст именно в этом созданном элементе
btnChangeElementText.addEventListener('click', () => {
    const item = document.getElementById('created-demo-item');
    if (item) {
        item.textContent = 'Привет, мир!';
    }
});

// 3. Удалить этот элемент
btnDeleteElement.addEventListener('click', () => {
    const item = document.getElementById('created-demo-item');
    if (item) {
        item.remove();
    }
});

/* ==============================
   Task 1 (внутри вкладки): изменяемый абзац
   ============================== */

const task1Output = document.getElementById('task1-output');
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

// Task 3:
const tableContainer = document.getElementById('table-container');
const btnGenerateTable = document.getElementById('btn-generate-table');

const cellColors = [
    '',
    'color-yellow',
    'color-green',
    'color-blue'
];

function generateTable(rows, cols) {
    tableContainer.innerHTML = '';

    const table = document.createElement('table');

    for (let r=0; r<rows; r++){
        const tr = document.createElement('tr');

        for (let c=0; c<cols;c++) {
            const td = document.createElement('td');

            td.classList.add('table-cell');

            td.addEventListener('click', () => {
                cycleCellColor(td);
            })

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    tableContainer.appendChild(table);
}
function cycleCellColor(cell){
    let currentIndex = cellColors.findIndex(colorClass => {
        if (colorClass == ''){
            return !cell.classList.contains('color-yellow')&&
            !cell.classList.contains('color-green')&&
            !cell.classList.contains('color-blue');
        }
        return cell.classList.contains(colorClass);
    });
    if (currentIndex == -1){
        currentIndex = 0;
    }
    cell.classList.remove(
        'color-yellow',
        'color-green',
        'color-blue'
    );
    const nextIndex = (currentIndex + 1) % cellColors.length;
    
    const nextColor = cellColors[nextIndex];
    if (nextColor !== ''){
        cell.classList.add(nextColor);
    }
}
btnGenerateTable.addEventListener('click', () => {

    const rows = parseInt(
        document.getElementById('table-cols').value
    ) || 1;
    generateTable(rows, cols);
});

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});