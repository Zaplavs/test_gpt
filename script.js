// DentaLux - Premium Dental Clinic JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
    });

    // Appointment Form Submission
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const service = formData.get('service');
            
            // Show success message
            alert(`Спасибо, ${name}! Ваша заявка принята.\nМы свяжемся с вами по номеру ${phone} в течение 15 минут.${service ? `\nИнтересующая услуга: ${service}` : ''}`);
            
            // Reset form
            this.reset();
        });
    }

    // Reviews Slider (Simple Implementation)
    const reviews = [
        {
            text: "«Невероятно профессиональный подход! Лечила зубы у доктора Петрова — всё прошло абсолютно безболезненно. Теперь не боюсь стоматологов вообще. Рекомендую всем!»",
            author: "Анна Михайлова",
            period: "Пациент с 2019 года"
        },
        {
            text: "«Делал имплантацию в этой клинике. Результат превзошёл все ожидания! Зубы как родные, никаких проблем. Спасибо всей команде за профессионализм!»",
            author: "Сергей Иванов",
            period: "Пациент с 2021 года"
        },
        {
            text: "«Устанавливала виниры у доктора Волкова. Работа выполнена безупречно! Улыбка стала голливудской. Клиника уровня премиум, сервис на высоте.»",
            author: "Елена Козлова",
            period: "Пациент с 2020 года"
        }
    ];

    let currentReview = 0;
    const reviewCard = document.querySelector('.review-card');
    const reviewDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.review-prev');
    const nextBtn = document.querySelector('.review-next');

    function updateReview(index) {
        const review = reviews[index];
        reviewCard.querySelector('.review-text').textContent = review.text;
        reviewCard.querySelector('.review-author strong').textContent = review.author;
        reviewCard.querySelector('.review-author span').textContent = review.period;
        reviewCard.querySelector('.author-avatar').textContent = review.author.charAt(0);
        
        reviewDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentReview = (currentReview - 1 + reviews.length) % reviews.length;
            updateReview(currentReview);
        });

        nextBtn.addEventListener('click', function() {
            currentReview = (currentReview + 1) % reviews.length;
            updateReview(currentReview);
        });
    }

    // Animate Elements on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards, doctor cards, etc.
    document.querySelectorAll('.service-card, .doctor-card, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Counter Animation for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (element.dataset.suffix || '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.dataset.suffix || '');
            }
        }
        
        updateCounter();
    }

    // Trigger counter animation when stats are visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.replace(/[0-9+K%]/g, '');
                    stat.dataset.suffix = suffix;
                    animateCounter(stat, number);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    console.log('DentaLux website loaded successfully! 🦷');
});
