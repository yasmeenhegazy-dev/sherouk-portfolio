document.addEventListener('DOMContentLoaded', () => {
    // ---- Mobile Navigation Toggle ----
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ---- Sticky Navbar & Active Link Update ----
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Update (Scroll Spy)
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // ---- Dark Mode Toggle ----
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.hasAttribute('data-theme')) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('portfolio-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('portfolio-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // ---- Set Current Year in Footer ----
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ---- Contact Modal ----
    const modal = document.getElementById('contactModal');
    const modalBtns = document.querySelectorAll('.contact-modal-btn');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && closeBtn) {
        // Open modal on click
        modalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('show');
            });
        });

        // Close modal
        const closeModal = () => {
            modal.classList.remove('show');
        };

        closeBtn.addEventListener('click', closeModal);

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
