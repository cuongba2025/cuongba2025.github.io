// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translateY(8px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-8px)' 
        : 'none';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observe destination cards
document.querySelectorAll('.destination-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Form validation
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.submit-btn');

submitBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff4444';
            setTimeout(() => {
                input.style.borderColor = '#e0e0e0';
            }, 3000);
        }
    });
    
    if (isValid) {
        // Show success message
        submitBtn.textContent = 'Đã gửi thành công!';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        // Reset form
        setTimeout(() => {
            inputs.forEach(input => input.value = '');
            submitBtn.textContent = 'Gửi tin nhắn';
            submitBtn.style.background = 'linear-gradient(135deg, #D4AF37, #8B4513)';
        }, 3000);
    }
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    
    const searchInputs = document.querySelectorAll('.search-box input');
    let hasValue = false;
    
    searchInputs.forEach(input => {
        if (input.value.trim()) {
            hasValue = true;
        }
    });
    
    if (hasValue) {
        // Animate button
        searchBtn.textContent = 'Đang tìm kiếm...';
        searchBtn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            searchBtn.textContent = 'Tìm thấy chuyến bay!';
            searchBtn.style.transform = 'scale(1)';
            
            setTimeout(() => {
                searchBtn.textContent = 'Tìm chuyến bay';
            }, 2000);
        }, 1500);
    } else {
        // Shake animation if no input
        searchBtn.style.animation = 'shake 0.5s';
        setTimeout(() => {
            searchBtn.style.animation = '';
        }, 500);
    }
});

// Shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Add parallax effect to floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Counter animation for stats
const stats = document.querySelectorAll('.stat h4');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = entry.target;
            const value = target.textContent;
            const number = parseInt(value.replace(/\D/g, ''));
            const suffix = value.replace(/[0-9]/g, '');
            let current = 0;
            const increment = number / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    target.textContent = number + suffix;
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effect to destination cards
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) rotate(1deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Date input enhancement
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];
dateInputs.forEach(input => {
    input.min = today;
});

// Auto-complete simulation for location inputs
const locations = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Nha Trang', 'Phú Quốc', 'Đà Lạt', 'Hội An', 'Huế'];
const locationInputs = document.querySelectorAll('.search-box input[type="text"]');

locationInputs.forEach(input => {
    const datalist = document.createElement('datalist');
    datalist.id = `locations-${Math.random().toString(36).substr(2, 9)}`;
    
    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        datalist.appendChild(option);
    });
    
    document.body.appendChild(datalist);
    input.setAttribute('list', datalist.id);
});

console.log('SkyfareHub website loaded successfully!');
