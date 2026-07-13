// Finds the regular reveal items.
const revealItems = document.querySelectorAll(".reveal:not(.reveal-early)");

// Finds the Back to Top button wrapper so it can appear sooner.
const earlyRevealItems = document.querySelectorAll(".reveal-early");

// Finds the three skill category boxes so each one can animate on mobile.
const skillGroupItems = document.querySelectorAll("#skills .skill-group");

// Types the hero role text in a looping animation.
const typingText = document.querySelector("#typing-text");
const typingRoles = ["Software Developer", "Web Developer"];

if (typingText) {
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 120;

  const typeRole = () => {
    const currentRole = typingRoles[roleIndex];

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    typingText.textContent = currentRole.slice(0, charIndex);

    if (!isDeleting && charIndex === currentRole.length) {
      typingDelay = 1200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % typingRoles.length;
      typingDelay = 500;
    } else {
      typingDelay = isDeleting ? 70 : 120;
    }

    setTimeout(typeRole, typingDelay);
  };

  typeRole();
}

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

// Watches each skill category box so Frontend, Backend, and Database reveal one by one on phones.
const skillGroupObserver = new IntersectionObserver(
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
        threshold: 0.2,
        rootMargin: "0px 0px -30px 0px"
    }
);

skillGroupItems.forEach((item) => {
    skillGroupObserver.observe(item);
});

// Makes the CV link download the file.
const cvLink = document.querySelector('a[download][href*="CV.pdf"]');

if (cvLink) {
  cvLink.addEventListener('click', function(e) {
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
}

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
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Gets the form data.
    const formData = new FormData(this);

    // Finds the submit button.
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    const originalColor = submitButton.style.color;
    const originalBackground = submitButton.style.background;

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
      if (response.ok) {
        // Clear the fields so the details disappear after sending.
        this.reset();
        submitButton.textContent = 'Message Sent';
        submitButton.style.background = '#16a34a';
        submitButton.style.color = '#ffffff';
      } else {
        submitButton.textContent = 'Error - Try Again';
      }
    }).catch(() => {
      submitButton.textContent = 'Error - Try Again';
    }).finally(() => {
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.color = originalColor;
        submitButton.style.background = originalBackground;
        submitButton.disabled = false;
      }, 2500);
    });
  });
}
