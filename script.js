// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const tabBtns = document.querySelectorAll('.tab-btn');
const searchBoxes = document.querySelectorAll('.search-box');

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Active navigation link based on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    // Show/hide back to top button
    if (currentScroll > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    lastScroll = currentScroll;
});

// Back to top functionality
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
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

// Search tabs functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs and boxes
        tabBtns.forEach(b => b.classList.remove('active'));
        searchBoxes.forEach(box => box.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        
        // Show corresponding search box
        const targetBox = document.getElementById(`${tabName}-search`);
        if (targetBox) {
            targetBox.classList.add('active');
        }
    });
});

// Swap button functionality
const swapBtn = document.querySelector('.swap-btn');
if (swapBtn) {
    swapBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.search-input');
        if (inputs.length >= 2) {
            const temp = inputs[0].value;
            inputs[0].value = inputs[1].value;
            inputs[1].value = temp;
        }
    });
}

// Date input min value (today)
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];
dateInputs.forEach(input => {
    input.min = today;
});

// Counter animation for statistics
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
            if (element.textContent.includes('98')) {
                element.textContent += '%';
            } else if (element.textContent.includes('500') || element.textContent.includes('1000')) {
                element.textContent += '+';
            }
        }
    };
    
    updateCounter();
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    counterObserver.observe(stat);
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 3000);
            }
        });
        
        if (isValid) {
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '✓ Đã gửi thành công!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email && email.includes('@')) {
            const button = newsletterForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '✓ Đã đăng ký!';
            
            setTimeout(() => {
                emailInput.value = '';
                button.textContent = originalText;
            }, 3000);
        }
    });
}

// Search functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const activeBox = document.querySelector('.search-box.active');
        const inputs = activeBox.querySelectorAll('.search-input');
        let hasValue = false;
        
        inputs.forEach(input => {
            if (input.value.trim()) {
                hasValue = true;
            }
        });
        
        if (hasValue) {
            // Animate button
            searchBtn.innerHTML = '<span>Đang tìm kiếm...</span>';
            searchBtn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                searchBtn.innerHTML = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg> Tìm thấy kết quả!';
                searchBtn.style.transform = 'scale(1)';
                
                setTimeout(() => {
                    searchBtn.innerHTML = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg> Tìm chuyến bay';
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
}

// Add shake animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if you add real images later)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
}, { rootMargin: '50px' });

// Observe all images with data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Auto-complete for location inputs
const locations = [
    'Hà Nội (HAN)',
    'TP. Hồ Chí Minh (SGN)',
    'Đà Nẵng (DAD)',
    'Nha Trang (CXR)',
    'Phú Quốc (PQC)',
    'Đà Lạt (DLI)',
    'Huế (HUI)',
    'Hải Phòng (HPH)',
    'Cần Thơ (VCA)',
    'Buôn Ma Thuột (BMV)',
    'Quy Nhơn (UIH)',
    'Vinh (VII)',
    'Pleiku (PXU)',
    'Bangkok (BKK)',
    'Singapore (SIN)',
    'Kuala Lumpur (KUL)',
    'Tokyo (NRT)',
    'Seoul (ICN)',
    'Hong Kong (HKG)',
    'Taipei (TPE)'
];

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

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .destination-card, .feature-item, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for scroll animations
document.querySelectorAll('.service-card, .destination-card, .feature-item, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Console message
console.log('%c🛫 Welcome to SkyfareHub! 🛫', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cKết nối bầu trời, khám phá thế giới', 'color: #8B4513; font-size: 14px;');
console.log('%cWebsite developed with ❤️ by SkyfareHub Team', 'color: #6B6B6B; font-size: 12px;');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set active tab
    const firstTab = document.querySelector('.tab-btn');
    const firstSearchBox = document.querySelector('.search-box');
    if (firstTab) firstTab.classList.add('active');
    if (firstSearchBox) firstSearchBox.classList.add('active');
    
    // Trigger animations
    animateOnScroll();
});