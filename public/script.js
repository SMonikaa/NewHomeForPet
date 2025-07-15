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

// Interactive pet card clicks with enhanced palette effect
document.querySelectorAll('.pet-card').forEach((card, index) => {
    card.addEventListener('click', function() {
        const petName = this.querySelector('.pet-name').textContent;
        
        // Enhanced click animation
        this.style.transform = 'translateX(0) rotate(0deg) translateY(-80px) scale(1.15)';
        this.style.zIndex = '20';
        
        // Show interest animation
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'absolute';
        heart.style.top = '50%';
        heart.style.left = '50%';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.fontSize = '2rem';
        heart.style.animation = 'floatUp 1s ease-out forwards';
        heart.style.pointerEvents = 'none';
        
        this.appendChild(heart);
        
        setTimeout(() => {
            // Return to original palette position
            if (index === 0) {
                this.style.transform = 'translateX(-120px) rotate(-20deg) translateY(-20px)';
                this.style.zIndex = '1';
            } else if (index === 1) {
                this.style.transform = 'translateX(0) rotate(0deg) translateY(-40px)';
                this.style.zIndex = '3';
            } else if (index === 2) {
                this.style.transform = 'translateX(120px) rotate(20deg) translateY(-20px)';
                this.style.zIndex = '2';
            }
            heart.remove();
        }, 1000);
    });
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const finalNumber = parseInt(statNumber.textContent.replace(/[^\d]/g, ''));
            animateNumber(statNumber, finalNumber);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        const suffix = element.textContent.includes('+') ? '+' : 
                     element.textContent.includes('%') ? '%' : '';
        element.textContent = Math.floor(current) + suffix;
    }, 40);
}

// Animate service cards on scroll
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    serviceObserver.observe(card);
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Paws & Hearts website loaded successfully!');
    
    // Add any additional initialization code here
    // For example, loading pet data from PHP backend
    // loadPetData();
});

// Function to load pet data (placeholder for PHP integration)
function loadPetData() {
    // This function would typically make an AJAX request to a PHP endpoint
    // fetch('pets.php')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Update pet cards with real data
    //         updatePetCards(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading pet data:', error);
    //     });
}

// Function to update pet cards with data from PHP
function updatePetCards(petsData) {
    const petCards = document.querySelectorAll('.pet-card');
    
    petsData.forEach((pet, index) => {
        if (petCards[index]) {
            const card = petCards[index];
            card.querySelector('.pet-name').textContent = pet.name;
            card.querySelector('.pet-details').textContent = `${pet.age} • ${pet.gender} • ${pet.personality}`;
            card.querySelector('.pet-emoji').textContent = pet.emoji;
            
            const status = card.querySelector('.adoption-status');
            status.textContent = pet.status;
            status.className = `adoption-status ${pet.status.toLowerCase()}`;
        }
    });
}

// Form submission handler (for future forms)
function handleFormSubmission(formData) {
    // This would send data to PHP backend
    // fetch('submit_application.php', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(result => {
    //     if (result.success) {
    //         showSuccessMessage('Application submitted successfully!');
    //     } else {
    //         showErrorMessage('Error submitting application. Please try again.');
    //     }
    // });
}

// Utility functions for user feedback
function showSuccessMessage(message) {
    const banner = document.querySelector('.success-banner');
    banner.textContent = `✅ ${message}`;
    banner.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
}

function showErrorMessage(message) {
    const banner = document.querySelector('.success-banner');
    banner.textContent = `❌ ${message}`;
    banner.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
}