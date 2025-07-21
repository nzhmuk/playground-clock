const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  }
  requestAnimationFrame(drawParticles);
}

createParticles(200);
drawParticles();

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

document.body.addEventListener('mousemove', (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const offsetX = (e.clientX - centerX) / centerX;
  const offsetY = (e.clientY - centerY) / centerY;
  const clock = document.getElementById('clock');
  clock.style.transform = `translate(-50%, -50%) rotateX(${offsetY * 10}deg) rotateY(${offsetX * 10}deg)`;
});

document.body.addEventListener('mouseleave', () => {
  document.getElementById('clock').style.transform = 'translate(-50%, -50%) rotateX(0deg) rotateY(0deg)';
});
