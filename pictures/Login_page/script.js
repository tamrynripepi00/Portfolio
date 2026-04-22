const flipButtons = document.querySelectorAll('.flip-btn');
const card = document.querySelector('.card');
const cardContainer = document.querySelector('.card-container');

flipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (cardContainer.classList.contains('animating')) {
      return;
    }

    cardContainer.classList.add('animating', 'falling');
  });
});

cardContainer.addEventListener('animationend', (event) => {
  if (event.animationName === 'fall-away') {
    card.classList.toggle('show-back');
    cardContainer.classList.remove('falling');
    cardContainer.classList.add('reappear');
    return;
  }

  if (event.animationName === 'reappear') {
    cardContainer.classList.remove('reappear', 'animating');
  }
});
