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

const buttons = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('.card');
const teamMembers = document.querySelectorAll('.team-member');

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


const targetTitle = document.getElementById('target-title');
if (targetTitle) {
    targetTitle.textContent = 'Привет, мир!';
}


const newDiv = document.createElement('div');
newDiv.className = 'new-div';
newDiv.textContent = 'Я новый элемент';
document.getElementById('task1-output').appendChild(newDiv);


const oldElement = document.querySelector('.old-element');
if (oldElement) {
    oldElement.remove();
}


const editableParagraph = document.createElement('p');
editableParagraph.className = 'editable-paragraph';
editableParagraph.textContent = 'Это изменяемый абзац.';
document.getElementById('task1-output').appendChild(editableParagraph);


editableParagraph.addEventListener('click', () => {
    editableParagraph.classList.toggle('editable-paragraph--active');
});


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
