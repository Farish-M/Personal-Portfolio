// Load Navbar Component
// This script loads the navbar into any page

async function loadNavbar() {
    try {
        const response = await fetch('../src/components/navbar.html');
        const navbarHTML = await response.text();
        
        // Insert navbar at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        
        // Highlight active page
        highlightActivePage();
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Highlight the current page in navigation
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop().split('#')[0] || 'index.html';
        
        if (linkPage === currentPage) {
            link.style.color = '#000';
            link.style.fontWeight = '700';
        }
    });
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar);