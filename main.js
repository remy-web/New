// Main JavaScript for Ending Hidden Hunger Platform
// NISR Hackathon 2025 - Track 2

// Section Management Functions
function showSection(sectionId) {
    // Hide all detail sections first
    const sections = ['mapping-details', 'prediction-details', 'analysis-details', 'intervention-details'];
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // Show the requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add a small delay for better UX
        setTimeout(() => {
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateY(20px)';
            targetSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Smooth Navigation
function initializeSmoothNavigation() {
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
}

// Statistics Animation
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasPercent = text.includes('%');
        const hasM = text.includes('M');
        const number = parseFloat(text);
        
        if (!isNaN(number)) {
            let current = 0;
            const increment = number / 40; // Slower animation
            const suffix = hasPercent ? '%' : hasM ? 'M' : '';
            
            stat.textContent = '0' + suffix;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = text; // Restore original text
                    clearInterval(timer);
                } else {
                    if (hasM) {
                        stat.textContent = current.toFixed(1) + 'M';
                    } else if (hasPercent) {
                        stat.textContent = Math.floor(current) + '%';
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }
            }, 80);
        }
    });
}

// Interactive Map Functions
function loadInteractiveMap() {
    // Simulate loading interactive map
    const mapPlaceholder = document.querySelector('.map-placeholder');
    const originalContent = mapPlaceholder.innerHTML;
    
    mapPlaceholder.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div style="width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid #2196f3; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="color: #1976d2; font-weight: bold;">Loading interactive geospatial map...</p>
            <p style="color: #666; font-size: 0.9rem;">Initializing Rwanda district boundaries and malnutrition data</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    // Simulate loading time
    setTimeout(() => {
        mapPlaceholder.innerHTML = `
            <div style="text-align: center;">
                <h3 style="color: #28a745; margin-bottom: 1rem;">🗺️ Interactive Map Loaded Successfully!</h3>
                <p style="color: #666; margin-bottom: 1.5rem;">Click on districts to view detailed malnutrition statistics</p>
                <div style="background: #f8f9fa; padding: 2rem; border-radius: 10px; margin: 1rem 0;">
                    <p