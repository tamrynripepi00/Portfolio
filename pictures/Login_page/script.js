const flipButtons = document.querySelectorAll('.flip-btn');
const card = document.querySelector('.card');
const cardContainer = document.querySelector('.card-container');
const signupButton = document.querySelector('#signup-btn');
const signupEmail = document.querySelector('#signup-email');
const signupUsername = document.querySelector('#signup-username');
const signupPassword = document.querySelector('#signup-password');
const signupToast = document.querySelector('#signup-toast');
let toastTimeout;

function showSignupToast(message) {
  signupToast.textContent = message;
  signupToast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    signupToast.classList.remove('show');
  }, 2200);
}

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

signupButton.addEventListener('click', () => {
  const hasSignupDetails =
    signupEmail.value.trim() &&
    signupUsername.value.trim() &&
    signupPassword.value.trim();

  if (!hasSignupDetails) {
    showSignupToast('Fill in all signup fields');
    return;
  }

  showSignupToast('Account created');
  signupEmail.value = '';
  signupUsername.value = '';
  signupPassword.value = '';
});
