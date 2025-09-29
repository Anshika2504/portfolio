// Typing animation with expanded roles
var typed = new Typed(".typing",{
    strings:["Web Designer", "Front-End Developer",  "Problem Solver"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation highlighting
const nav = document.querySelector(".nav");
const navList = nav.querySelectorAll("li");
const sections = document.querySelectorAll(".section");

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navList.forEach(li => {
        li.querySelector('a').classList.remove('active');
        if (li.querySelector('a').getAttribute('href').includes(current)) {
            li.querySelector('a').classList.add('active');
        }
    });
});

// Form validation and submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('input[placeholder="Name"]').value;
    const email = form.querySelector('input[placeholder="Email"]').value;
    const subject = form.querySelector('input[placeholder="Subject"]').value;
    const message = form.querySelector('textarea[placeholder="Message"]').value;

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Add email validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Here you would typically send the form data to a server
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
});

// Email validation helper
function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

// Skill bars animation
const skillBars = document.querySelectorAll('.progress-in');
const skillsSection = document.querySelector('.skills');

window.addEventListener('scroll', () => {
    if (isElementInViewport(skillsSection)) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            try {
                const btn = event.target.querySelector('button[type="submit"]');
                btn.disabled = true;
                btn.textContent = 'Sending...';

                const templateParams = {
                    to_email: "shiwanirajput933@gmail.com",
                    from_name: document.getElementById('name').value,
                    from_email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };

                // Send email using EmailJS
                const response = await emailjs.send('service_vqmwiav', 'template_qm54w2f', templateParams);
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you! Your message has been sent successfully.');
                event.target.reset();
            } catch (error) {
                console.error('FAILED...', error);
                alert('Oops! Something went wrong. Please try again.');
            } finally {
                const btn = event.target.querySelector('button[type="submit"]');
                btn.disabled = false;
                btn.textContent = 'Send Message';
            }
        });
    }
});