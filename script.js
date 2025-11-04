document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Active Nav Link ---
    // Use a simple endsWith check for robust path matching (works for root and nested paths)
    const currentPagePath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        // Handle index.html case for root path
        if (currentPagePath === '/' && linkPath.endsWith('index.html')) {
            link.classList.add('nav-active');
        } else if (linkPath !== '/' && currentPagePath.endsWith(linkPath)) {
             link.classList.add('nav-active');
        }
    });

    // --- Gallery Modal ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModalButton = document.getElementById('closeModal');

    if (imageModal && modalImage) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                modalImage.src = imgSrc;
                imageModal.classList.add('active');
            });
        });

        const closeModal = () => {
            imageModal.classList.remove('active');
        };

        if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');

            formStatus.textContent = `Thank you, ${name}. Your message has been received!`;
            formStatus.classList.remove('hidden');
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.classList.add('hidden');
            }, 5000);
        });
    }
});
