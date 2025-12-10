// Автоматическое определение активной страницы в навигации
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (linkPage.includes('#') && linkPage.split('#')[0] === currentPage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Обработка форм
    const submissionDateField = document.getElementById('submission-date');
    if (submissionDateField) {
        submissionDateField.value = new Date().toISOString();
    }

    const orderDateField = document.getElementById('order-submission-date');
    if (orderDateField) {
        orderDateField.value = new Date().toISOString();
    }

    // Установка user agent
    const userAgentField = document.getElementById('user-agent');
    if (userAgentField) {
        userAgentField.value = navigator.userAgent;
    }

    // Обработка формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                showNotification('Данные успешно отправлены!', 'success');
                contactForm.reset();
            }
        });
    }

    // Обработка формы заказа
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateOrderForm()) {
                showNotification('Заказ успешно отправлен!', 'success');
                orderForm.reset();
            }
        });
    }

    // Валидация пароля
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    if (password && confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Пароли не совпадают');
            } else {
                confirmPassword.setCustomValidity('');
            }
        });
    }

    // Плавная прокрутка
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
});

// Валидация формы контактов
function validateContactForm() {
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email.value)) {
        showNotification('Введите корректный email', 'error');
        email.focus();
        return false;
    }
    
    return true;
}

// Валидация формы заказа
function validateOrderForm() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    
    if (password.value.length < 6) {
        showNotification('Пароль должен содержать не менее 6 символов', 'error');
        password.focus();
        return false;
    }
    
    if (password.value !== confirmPassword.value) {
        showNotification('Пароли не совпадают', 'error');
        confirmPassword.focus();
        return false;
    }
    
    return true;
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else {
        notification.style.backgroundColor = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// CSS для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);