// Finds the regular reveal items.
const revealItems = document.querySelectorAll(".reveal:not(.reveal-early)");

// Finds the Back to Top button wrapper so it can appear sooner.
const earlyRevealItems = document.querySelectorAll(".reveal-early");

// Watches reveal items when they scroll into view.
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            // Adds .is-visible when the item is on screen.
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                // Removes .is-visible when the item leaves the screen.
                entry.target.classList.remove("is-visible");
            }
        });
    },
    {
        // Starts when you see the items.
        threshold: 0.15,
        // Starts the animation a little earlier. // top, right, buttom, left
        rootMargin: "0px 0px -40px 0px"
    }
);

// Starts watching each reveal item.
revealItems.forEach((item) => {
    revealObserver.observe(item);
});

// Shows the Back to Top button a bit earlier while scrolling.
const earlyRevealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }
        });
    },
    {
        threshold: 0.05,
        rootMargin: "0px 0px 140px 0px"
    }
);

// Starts watching the Back to Top button wrapper.
earlyRevealItems.forEach((item) => {
    earlyRevealObserver.observe(item);
});

// Makes the CV link download the file.
document.querySelector('a[href*="My CV.pdf"]').addEventListener('click', function(e) {
  e.preventDefault();

  // Gets the PDF link.
  const link = this.href;

  // Sets the file name.
  const filename = 'Tamryn-Ripepi-CV.pdf';

  // Makes a hidden link and clicks it.
  const a = document.createElement('a');
  a.href = link;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Tries to open the Outlook app first, then falls back to Outlook web.
const outlookLink = document.querySelector('#outlook-link');

if (outlookLink) {
  outlookLink.addEventListener('click', function(e) {
    e.preventDefault();

    const appLink = this.dataset.appLink;
    const fallbackLink = this.href;
    const startTime = Date.now();

    window.location.href = appLink;

    setTimeout(() => {
      if (Date.now() - startTime < 1800) {
        window.open(fallbackLink, '_blank', 'noopener,noreferrer');
      }
    }, 900);
  });
}

// Sends the contact form without reloading the page.
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Gets the form data.
  const formData = new FormData(this);

  // Finds the submit button.
  const submitButton = this.querySelector('button[type="submit"]');

  // Saves the button text and color.
  const originalText = submitButton.textContent;
  const originalBg = submitButton.style.background;
  
  // Shows that the form is sending.
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  // Sends the form to Formspree.
  fetch('https://formspree.io/f/xnjldjzn', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    // If it works, clear the form and show success.
    if (response.ok) {
      this.reset(); // Clears input values (words disappear)
      submitButton.textContent = 'Message Sent!';
      submitButton.style.background = '#10b981';
    } else {
      // If it fails, show an error.
      submitButton.textContent = 'Error - Try Again';
      submitButton.style.background = '#ef4444';
    }
  }).catch(() => {
    // If something goes wrong, show an error.
    submitButton.textContent = 'Error - Try Again';
    submitButton.style.background = '#ef4444';
  }).finally(() => {
    // Changes the button back after 3 seconds.
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.style.background = originalBg;
      submitButton.disabled = false;
    }, 3000);
  });
});
