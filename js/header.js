 header.js - DTRC Premium Header
 Vanilla JavaScript - Production Ready

 Initialize Header Functionality
function initHeader() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav__link');
    const mobileToggle = document.querySelector('.header__mobile-toggle');
    let isMenuOpen = false;
    let lastScrollY = 0;

     Sticky Header + Shrink Effect
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY  80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }

     Active Navigation Link Highlight
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        navLinks.forEach(link = {
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition = sectionTop && 
                    scrollPosition  sectionTop + sectionHeight) {
                    navLinks.forEach(l = l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

     Smooth Scrolling
    function initSmoothScroll() {
        navLinks.forEach(link = {
            link.addEventListener('click', (e) = {
                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetSection.getBoundingClientRect().top + 
                                             window.scrollY - headerHeight - 20;
                        
                        window.scrollTo({
                            top targetPosition,
                            behavior 'smooth'
                        });
                    }
                }
            });
        });
    }

     Mobile Menu
    function initMobileMenu() {
        if (!mobileToggle) return;
        
        mobileToggle.addEventListener('click', () = {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileToggle.setAttribute('aria-expanded', 'true');
                mobileToggle.classList.add('active');
            } else {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.classList.remove('active');
            }
        });
        
         Close menu when clicking nav links
        navLinks.forEach(link = {
            link.addEventListener('click', () = {
                if (isMenuOpen) {
                    isMenuOpen = false;
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mobileToggle.classList.remove('active');
                }
            });
        });
        
         Close menu on Escape key
        document.addEventListener('keydown', (e) = {
            if (e.key === 'Escape' && isMenuOpen) {
                isMenuOpen = false;
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.classList.remove('active');
            }
        });
    }

     Keyboard Accessibility
    function initKeyboardSupport() {
        document.addEventListener('keydown', (e) = {
            if (e.key === '' && document.activeElement.tagName !== INPUT && 
                document.activeElement.tagName !== TEXTAREA) {
                e.preventDefault();
                const firstLink = document.querySelector('.nav__link');
                if (firstLink) firstLink.focus();
            }
        });
    }

     Event Listeners
    window.addEventListener('scroll', () = {
        handleScroll();
        updateActiveLink();
    });

     Initialize all features
    initSmoothScroll();
    initMobileMenu();
    initKeyboardSupport();
    
     Initial call
    handleScroll();
    updateActiveLink();
}

 Run when DOM is ready
document.addEventListener('DOMContentLoaded', initHeader);