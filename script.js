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
  let typingDelay = 160;
  let typingTimer = null;
  const roleHoldDelay = 3000;

  const resetTyping = () => {
    roleIndex = 0;
    charIndex = typingRoles[0].length;
    isDeleting = true;
    typingText.textContent = typingRoles[0];
  };

  const typeRole = () => {
    const currentRole = typingRoles[roleIndex];

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    typingText.textContent = currentRole.slice(0, charIndex);

    if (!isDeleting && charIndex === currentRole.length) {
      typingDelay = roleHoldDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % typingRoles.length;
      typingDelay = 900;
    } else {
      typingDelay = isDeleting ? 100 : 160;
    }

    typingTimer = setTimeout(typeRole, typingDelay);
  };

  resetTyping();
  typingTimer = setTimeout(typeRole, roleHoldDelay);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      clearTimeout(typingTimer);
      resetTyping();
      typingTimer = setTimeout(typeRole, roleHoldDelay);
    }
  });
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

// Slides each story paragraph in from the side, and again when you scroll back up.
const storyParas = document.querySelectorAll(".story-para");

// On phones, fade the intro photo and name as soon as the story panel starts to show.
const aboutIntroTitle = document.querySelector(".about-intro-title");
const aboutStory = document.querySelector(".about-story");
const aboutIntro = document.querySelector(".about-intro");
const aboutIntroPhoto = document.querySelector(".about-intro .profile-section");
const phoneQuery = window.matchMedia("(max-width: 480px)");

if (aboutIntro && aboutIntroTitle && aboutIntroPhoto && aboutStory) {
    const introRevealItems = [aboutIntroPhoto, aboutIntroTitle];

    const updateIntroTitle = () => {
        const wasStoryApproaching = aboutIntro.classList.contains("story-approaching");

        if (!phoneQuery.matches) {
            aboutIntro.classList.remove("story-approaching");
            if (wasStoryApproaching) {
                introRevealItems.forEach((item) => revealObserver.observe(item));
            }
            return;
        }

        const storyTop = aboutStory.getBoundingClientRect().top;
        const titleBottom = aboutIntroTitle.getBoundingClientRect().bottom;
        const storyApproaching = storyTop <= titleBottom + 40;
        aboutIntro.classList.toggle("story-approaching", storyApproaching);

        // Reset the phone reveal when the story appears, then observe again on the way back up.
        if (storyApproaching && !wasStoryApproaching) {
            introRevealItems.forEach((item) => {
                revealObserver.unobserve(item);
                item.classList.remove("is-visible");
            });
        } else if (!storyApproaching && wasStoryApproaching) {
            introRevealItems.forEach((item) => {
                const bounds = item.getBoundingClientRect();
                const isOnScreen = bounds.bottom > 0 && bounds.top < window.innerHeight;

                revealObserver.unobserve(item);
                item.classList.remove("is-visible");

                if (isOnScreen) {
                    // Restart the side-slide from its hidden position before revealing it again.
                    void item.offsetWidth;
                    item.classList.add("is-visible");
                }

                revealObserver.observe(item);
            });
        }
    };

    updateIntroTitle();
    window.addEventListener("scroll", updateIntroTitle, { passive: true });
    window.addEventListener("resize", updateIntroTitle);
}

const storyObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
    },
    {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px"
    }
);

storyParas.forEach((para) => storyObserver.observe(para));
