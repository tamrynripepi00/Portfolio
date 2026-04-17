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
                revealObserver.unobserve(entry.target);
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

// Contact form - opens email client (frontend only)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  const subject = `Portfolio Contact Form: ${name}`;
  const body = `Email: ${email}%0D%0A%0D%0AMessage:%0D%0A${message.replace(/\n/g, '%0D%0A')}`;
  
  window.location.href = `mailto:tamrynripepi00@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  
  // Reset form
  this.reset();
  
  // Success message
  const button = this.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.textContent = 'Message Sent!';
  button.style.background = '#10b981';
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
  }, 3000);
});

