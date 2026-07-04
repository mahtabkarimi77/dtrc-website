// hero.js - DTRC Hero Section
// Vanilla JavaScript - Premium Research Institute Experience

class HeroEngine {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.network = document.querySelector('.hero__technology-network');
        this.nodes = document.querySelectorAll('.tech-node');
        this.stats = document.querySelectorAll('.stat__number');
        
        
        this.config = {
            nodeSpeed: 0.8,
            connectionOpacity: 0.15,
            mouseRadius: 180,
            parallaxStrength: 18,
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };
        
        this.nodesData = [];
        this.lines = [];
        this.mouse = { x: 0, y: 0 };
        this.isAnimating = true;
        
        this.init();
    }
    
    init() {
        if (!this.network) return;
        
        this.setupNodes();
        this.createConnectionLayer();
        this.bindEvents();
        this.startAnimation();
        this.initCounters();
        
        this.initIntersectionObserver();
    }
    
    setupNodes() {
        this.nodes.forEach((node, index) => {
            this.nodesData.push({
                element: node,
                x: Math.random() * this.network.offsetWidth,
                y: Math.random() * this.network.offsetHeight,
                vx: (Math.random() - 0.5) * this.config.nodeSpeed,
                vy: (Math.random() - 0.5) * this.config.nodeSpeed,
                radius: 21
            });
            
            node.style.left = this.nodesData[index].x + 'px';
            node.style.top = this.nodesData[index].y + 'px';
        });
    }
    
    createConnectionLayer() {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.style.position = 'absolute';
        this.svg.style.top = '0';
        this.svg.style.left = '0';
        this.svg.style.width = '100%';
        this.svg.style.height = '100%';
        this.svg.style.pointerEvents = 'none';
        this.svg.style.opacity = this.config.connectionOpacity;
        this.network.appendChild(this.svg);
    }
    
    bindEvents() {
        this.network.addEventListener('mousemove', (e) => {
            const rect = this.network.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        window.addEventListener('resize', () => this.onResize());
        
        document.addEventListener('visibilitychange', () => {
            this.isAnimating = !document.hidden;
        });
    }
    
    updateNodes() {
        this.nodesData.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce
            if (node.x <= node.radius || node.x >= this.network.offsetWidth - node.radius) node.vx *= -1;
            if (node.y <= node.radius || node.y >= this.network.offsetHeight - node.radius) node.vy *= -1;
            
            node.element.style.left = `${node.x}px`;
            node.element.style.top = `${node.y}px`;
        });
    }
    
    updateConnections() {
        this.svg.innerHTML = '';
        
        for (let i = 0; i < this.nodesData.length; i++) {
            for (let j = i + 1; j < this.nodesData.length; j++) {
                const dx = this.nodesData[i].x - this.nodesData[j].x;
                const dy = this.nodesData[i].y - this.nodesData[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 280) {
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute('x1', this.nodesData[i].x);
                    line.setAttribute('y1', this.nodesData[i].y);
                    line.setAttribute('x2', this.nodesData[j].x);
                    line.setAttribute('y2', this.nodesData[j].y);
                    line.setAttribute('stroke', '#00C8D7');
                    line.setAttribute('stroke-width', '1.5');
                    this.svg.appendChild(line);
                }
            }
        }
    }
    
    updateParallax() {
        const moveX = (this.mouse.x - this.network.offsetWidth / 2) * 0.018;
        const moveY = (this.mouse.y - this.network.offsetHeight / 2) * 0.018;
        
        this.network.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    animate() {
        if (!this.isAnimating || this.config.prefersReducedMotion) return;
        
        this.updateNodes();
        this.updateConnections();
        this.updateParallax();
        
        requestAnimationFrame(() => this.animate());
    }
    
    startAnimation() {
        this.animate();
    }
    
    initCounters() {
        this.stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const increment = Math.ceil(target / 45);
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target + (target > 10 ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = count;
                }
            }, 35);
        });
    }
    
    
    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('hero--visible');
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(this.hero);
    }
    
    onResize() {
        // Update container dimensions if needed
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new HeroEngine();
});