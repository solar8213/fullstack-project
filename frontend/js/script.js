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

const memberTitle = document.querySelector('#member-1 h2');
if (memberTitle) {
    memberTitle.textContent = 'Привет мир!';
}
const newDiv = document.createElement('div');
newDiv.className = 'new-div';
newDiv.classContent = 'Я новый элемент';
document.body.appendChild(newDiv);

const oldElement = document.querySelector('.old-element');
if (oldElement) {
    oldElement.remove()
}

const editableParagraph = document.createElement('p');
editableParagraph.className = 'editable-paragraph';
editableParagraph.textContent = 'Это изменяемый абзац.';
document.body.appendChild(editableParagraph);

editableParagraph.addEventListener('click', () => {
    editableParagraph.classList.toggle('editable-paragraph--active');
})

teamMembers.forEach(member => {
    member.addEventListener('dblclick', () => {
        member.classList.toggle('active')

        const classListArray = Array.from(member.classList);
        console.log(`Классы ${member.querySelector('.team-name').textContent}:`, classListArray);

        let classesInfo = member.querySelector('.classes-info');
        if (classesInfo) {
            classesInfo = document.createElement('p');
            classesInfo.className = 'classes-info';
            member.appendChild(classesInfo);
        }
        classesInfo.textContent = 'Классы: ' + classListArray.join(', ');
    })
})

