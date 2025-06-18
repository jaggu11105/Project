// ==== Mock User Database ====
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user1", password: "user123", role: "user" }
];

// ==== Login Functionality ====
function login() {
  const uname = document.getElementById("username")?.value.trim();
  const pwd = document.getElementById("password")?.value.trim();
  const error = document.getElementById("error");

  const roleToggle = document.getElementById("roleToggle");
  const selectedRole = roleToggle?.checked ? "admin" : "user";

  const foundUser = users.find(
    u => u.username === uname && u.password === pwd && u.role === selectedRole
  );

  if (foundUser) {
    if (error) error.textContent = "";
    alert(`Welcome, ${foundUser.role === "admin" ? "Admin" : "User"}!`);

    // Redirect to the appropriate dashboard
    window.location.href = foundUser.role === "admin"
      ? "home.html"
      : "home.html";
  } else {
    if (error) error.textContent = "Invalid username, password, or role!";
  }
}

// ==== Toggle Password Visibility ====
function togglePassword() {
  const passwordField = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");

  if (!passwordField) return;

  if (passwordField.type === "password") {
    passwordField.type = "text";
    if (eyeIcon) eyeIcon.textContent = "🙈";
  } else {
    passwordField.type = "password";
    if (eyeIcon) eyeIcon.textContent = "👁️";
  }
}

// ==== Animated Math Background ====
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas?.getContext("2d");

const formulas = [
  "E = mc²", "∫ x dx", "π ≈ 3.14", "Δx → 0", "f(x) = x²", "Σn=1^∞", "a² + b² = c²",
  "∂/∂x", "∇·E = ρ/ε₀", "sinθ", "cosθ", "tanθ", "λ", "θ", "∞", "√x", "log(x)", "dx/dt",
  "μ", "σ²", "Φ", "Ω", "γ", "𝑛!", "∑", "∫", "lim x→∞", "P(A|B)", "∛x", "d²y/dx²"
];

let particles = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  if (!canvas) return;

  particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    text: formulas[Math.floor(Math.random() * formulas.length)],
    speedY: 1.5 + Math.random() * 2.5,
    size: 14 + Math.random() * 10,
    opacity: 0.4 + Math.random() * 0.6
  }));
}

function draw() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.shadowColor = "#39ff14";
    ctx.shadowBlur = 12;
    ctx.fillStyle = `rgba(57, 255, 20, ${p.opacity})`;
    ctx.font = `${p.size}px monospace`;
    ctx.fillText(p.text, p.x, p.y);

    p.y += p.speedY;

    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
      p.text = formulas[Math.floor(Math.random() * formulas.length)];
      p.speedY = 1.5 + Math.random() * 2.5;
    }
  });

  requestAnimationFrame(draw);
}

// ==== Initialize ====
if (canvas && ctx) {
  resizeCanvas();
  initParticles();
  draw();
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
}
