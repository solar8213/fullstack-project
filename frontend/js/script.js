const buttons = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('.card');

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