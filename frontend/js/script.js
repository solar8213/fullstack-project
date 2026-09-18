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