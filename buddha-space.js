class DigitalizedBuddhaSpace {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        this.isAnimating = true;
        
        // Parameters
        this.dotDensity = 1.5;
        this.buddhaGlow = 30;
        this.spaceDepth = 500;
        
        // Stars and cosmic elements
        this.stars = [];
        this.nebulaClouds = [];
        
        // Buddha shape points
        this.buddhaPoints = [];
        
        this.setupCanvas();
        this.generateStars();
        this.generateNebulaClouds();
        this.generateBuddhaShape();
        this.setupEventListeners();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.generateStars();
            this.generateNebulaClouds();
            this.generateBuddhaShape();
        });
    }
    
    generateStars() {
        this.stars = [];
        const numStars = Math.floor(this.spaceDepth);
        
        for (let i = 0; i < numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 0.5,
                brightness: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }
    }
    
    generateNebulaClouds() {
        this.nebulaClouds = [];
        const numClouds = 15;
        
        for (let i = 0; i < numClouds; i++) {
            this.nebulaClouds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 200 + 100,
                color: this.getRandomNebulaColor(),
                opacity: Math.random() * 0.3 + 0.1,
                driftX: (Math.random() - 0.5) * 0.2,
                driftY: (Math.random() - 0.5) * 0.2
            });
        }
    }
    
    getRandomNebulaColor() {
        const colors = [
            'rgba(138, 43, 226, 0.3)',  // Purple
            'rgba(75, 0, 130, 0.3)',    // Indigo
            'rgba(0, 100, 200, 0.3)',   // Deep Blue
            'rgba(255, 20, 147, 0.3)',  // Deep Pink
            'rgba(0, 255, 255, 0.3)'    // Cyan
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    generateBuddhaShape() {
        this.buddhaPoints = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const scale = Math.min(this.canvas.width, this.canvas.height) * 0.3;
        
        // Generate Buddha silhouette using mathematical curves
        // Head (circle)
        this.addCirclePoints(centerX, centerY - scale * 0.3, scale * 0.25, 50);
        
        // Body (oval)
        this.addOvalPoints(centerX, centerY + scale * 0.1, scale * 0.35, scale * 0.4, 60);
        
        // Lotus position legs
        this.addOvalPoints(centerX - scale * 0.15, centerY + scale * 0.35, scale * 0.2, scale * 0.15, 30);
        this.addOvalPoints(centerX + scale * 0.15, centerY + scale * 0.35, scale * 0.2, scale * 0.15, 30);
        
        // Arms in meditation pose
        this.addOvalPoints(centerX - scale * 0.25, centerY, scale * 0.15, scale * 0.25, 25);
        this.addOvalPoints(centerX + scale * 0.25, centerY, scale * 0.15, scale * 0.25, 25);
        
        // Add some inner detail points
        this.addSpiralPoints(centerX, centerY - scale * 0.3, scale * 0.1, 20); // Head chakra
        this.addSpiralPoints(centerX, centerY, scale * 0.15, 30); // Heart chakra
        
        // Randomize points for dotted effect
        this.buddhaPoints = this.buddhaPoints.filter(() => Math.random() < this.dotDensity);
        
        // Add glow points around Buddha
        this.buddhaPoints.forEach(point => {
            point.glowIntensity = Math.random() * this.buddhaGlow + 20;
            point.pulseSpeed = Math.random() * 0.03 + 0.01;
            point.pulseOffset = Math.random() * Math.PI * 2;
        });
    }
    
    addCirclePoints(cx, cy, radius, numPoints) {
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            this.buddhaPoints.push({ x, y, type: 'outline' });
        }
    }
    
    addOvalPoints(cx, cy, radiusX, radiusY, numPoints) {
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const x = cx + Math.cos(angle) * radiusX;
            const y = cy + Math.sin(angle) * radiusY;
            this.buddhaPoints.push({ x, y, type: 'outline' });
        }
    }
    
    addSpiralPoints(cx, cy, radius, numPoints) {
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 4;
            const r = radius * (i / numPoints);
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            this.buddhaPoints.push({ x, y, type: 'inner' });
        }
    }
    
    setupEventListeners() {
        document.getElementById('dotDensity').addEventListener('input', (e) => {
            this.dotDensity = parseFloat(e.target.value);
            this.generateBuddhaShape();
        });
        
        document.getElementById('buddhaGlow').addEventListener('input', (e) => {
            this.buddhaGlow = parseFloat(e.target.value);
            this.generateBuddhaShape();
        });
        
        document.getElementById('spaceDepth').addEventListener('input', (e) => {
            this.spaceDepth = parseFloat(e.target.value);
            this.generateStars();
        });
    }
    
    animate() {
        if (!this.isAnimating) return;
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.001;
        
        // Draw nebula clouds
        this.drawNebulaClouds(time);
        
        // Draw stars
        this.drawStars(time);
        
        // Draw digitalized Buddha
        this.drawBuddha(time);
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawNebulaClouds(time) {
        this.nebulaClouds.forEach(cloud => {
            cloud.x += cloud.driftX;
            cloud.y += cloud.driftY;
            
            // Wrap around screen
            if (cloud.x > this.canvas.width + cloud.size) cloud.x = -cloud.size;
            if (cloud.x < -cloud.size) cloud.x = this.canvas.width + cloud.size;
            if (cloud.y > this.canvas.height + cloud.size) cloud.y = -cloud.size;
            if (cloud.y < -cloud.size) cloud.y = this.canvas.height + cloud.size;
            
            const gradient = this.ctx.createRadialGradient(
                cloud.x, cloud.y, 0,
                cloud.x, cloud.y, cloud.size
            );
            gradient.addColorStop(0, cloud.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                cloud.x - cloud.size,
                cloud.y - cloud.size,
                cloud.size * 2,
                cloud.size * 2
            );
        });
    }
    
    drawStars(time) {
        this.stars.forEach(star => {
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
            const brightness = star.brightness * twinkle;
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add star glow
            if (brightness > 0.7) {
                const glowGradient = this.ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.size * 3
                );
                glowGradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * 0.3})`);
                glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                this.ctx.fillStyle = glowGradient;
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
    }
    
    drawBuddha(time) {
        this.buddhaPoints.forEach(point => {
            const pulse = Math.sin(time * point.pulseSpeed + point.pulseOffset) * 0.5 + 0.5;
            const glowIntensity = point.glowIntensity * pulse;
            
            // Main dot
            const dotSize = point.type === 'inner' ? 2 : 3;
            this.ctx.fillStyle = `rgba(255, 215, 0, ${0.8 + pulse * 0.2})`;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, dotSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Glow effect
            const glowGradient = this.ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, glowIntensity
            );
            glowGradient.addColorStop(0, `rgba(255, 215, 0, ${0.6 * pulse})`);
            glowGradient.addColorStop(0.5, `rgba(255, 165, 0, ${0.3 * pulse})`);
            glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            
            this.ctx.fillStyle = glowGradient;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, glowIntensity, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
}

// Global functions for controls
function regenerate() {
    if (window.buddhaSpace) {
        window.buddhaSpace.generateStars();
        window.buddhaSpace.generateNebulaClouds();
        window.buddhaSpace.generateBuddhaShape();
    }
}

function toggleAnimation() {
    if (window.buddhaSpace) {
        window.buddhaSpace.isAnimating = !window.buddhaSpace.isAnimating;
        if (window.buddhaSpace.isAnimating) {
            window.buddhaSpace.animate();
        }
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    window.buddhaSpace = new DigitalizedBuddhaSpace();
});
