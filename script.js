const filterGroups = document.querySelectorAll("[data-filter-group]");
const revealItems = document.querySelectorAll(".reveal");

filterGroups.forEach((group) => {
    const buttons = group.querySelectorAll("[data-filter]");
    const section = group.closest("section");
    const targets = section.querySelectorAll("[data-category]");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            buttons.forEach((item) => item.classList.remove("is-active"));
            button.classList.add("is-active");

            targets.forEach((target) => {
                const categories = target.dataset.category.split(" ");
                const shouldShow =
                    selectedFilter === "all" || categories.includes(selectedFilter);

                target.classList.toggle("is-hidden", !shouldShow);
            });
        });
    });
});

const revealObserver = new IntersectionObserver(
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
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealItems.forEach((item) => {
    revealObserver.observe(item);
});

// Force CV download instead of opening tab
document.querySelector('a[href*="My CV.pdf"]').addEventListener('click', function(e) {
  e.preventDefault();
  const link = this.href;
  const filename = 'Tamryn-Ripepi-CV.pdf';
  const a = document.createElement('a');
  a.href = link;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Formspree AJAX handler - submit without page reload, clear form + success
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const submitButton = this.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  const originalBg = submitButton.style.background;
  
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  fetch('https://formspree.io/f/xnjldjzn', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      this.reset(); // Clears input values (words disappear)
      submitButton.textContent = 'Message Sent!';
      submitButton.style.background = '#10b981';
    } else {
      submitButton.textContent = 'Error - Try Again';
      submitButton.style.background = '#ef4444';
    }
  }).catch(() => {
    submitButton.textContent = 'Error - Try Again';
    submitButton.style.background = '#ef4444';
  }).finally(() => {
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.style.background = originalBg;
      submitButton.disabled = false;
    }, 3000);
  });
});
