let mode = "fibonacci";
let n = 0;
let isPaused = false;
let zoomLevel = 1;
let patternBuffer;
let bufferNeedsRedraw = true;

// --- INTERACTIVE CONTROLS ---
let animationSpeed = 2;
let elementSize = 6;
let colorIntensity = 200;

function updateSpeed(val) {
  animationSpeed = parseInt(val);
  document.getElementById('speedValue').textContent = val;
}

function updateSize(val) {
  elementSize = parseInt(val);
  document.getElementById('sizeValue').textContent = val;
}

function updateColor(val) {
  colorIntensity = parseInt(val);
  document.getElementById('colorValue').textContent = val;
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvas-holder");
  patternBuffer = createGraphics(width, height);
  patternBuffer.angleMode(DEGREES);
  patternBuffer.colorMode(HSB);
  patternBuffer.noStroke();
  angleMode(DEGREES);
  colorMode(HSB);
  noStroke();
  background(0);
  bufferNeedsRedraw = true;
}

function draw() {
  if (!isPaused && bufferNeedsRedraw) {
    for (let i = 0; i < animationSpeed; i++) {
      if (mode === "fibonacci") drawFibonacci(patternBuffer);
      else if (mode === "lucas") drawLucas(patternBuffer);
      else if (mode === "silver") drawSilver(patternBuffer);
      else if (mode === "pell") drawPell(patternBuffer);
      else if (mode === "tribonacci") drawTribonacci(patternBuffer);
      else if (mode === "plastic") drawPlastic(patternBuffer);
      else if (mode === "pi") drawPi(patternBuffer);
      else if (mode === "e") drawE(patternBuffer);
      else if (mode === "catalan") drawCatalan(patternBuffer);
    }
  }
  background(0);
  imageMode(CENTER);
  // Calculate scaled width and height
  let scaledW = patternBuffer.width * zoomLevel;
  let scaledH = patternBuffer.height * zoomLevel;
  // Draw the buffer centered and scaled
  image(patternBuffer, width/2, height/2, scaledW, scaledH);
}

function togglePause() {
  isPaused = !isPaused;
  document.getElementById('pauseBtn').textContent = isPaused ? '▶️ Play' : '⏸️ Pause';
}

function resetVisualization() {
  n = 0;
  patternBuffer.background(0);
  bufferNeedsRedraw = true;
}

function saveFrame() {
  saveCanvas('visualization', 'png');
}

// Patch draw functions to use elementSize and colorIntensity, and draw to buffer
function drawFibonacci(buf) {
  let angle = n * 137.5;
  let radius = elementSize * sqrt(n);
  buf.fill(angle % 360, colorIntensity, 255, 200);
  buf.ellipse(buf.width/2 + radius * cos(angle), buf.height/2 + radius * sin(angle), elementSize, elementSize);
  n++;
  bufferNeedsRedraw = true;
}
function drawLucas(buf) {
  let angle = n * 137.5;
  let radius = elementSize * sqrt(n + 2);
  buf.fill((angle * 1.2) % 360, colorIntensity, 255, 200);
  buf.ellipse(buf.width/2 + radius * cos(angle), buf.height/2 + radius * sin(angle), (elementSize + 1), (elementSize + 1));
  n++;
  bufferNeedsRedraw = true;
}
function drawSilver(buf) {
  let angle = n * 90;
  let radius = elementSize * 0.8 * sqrt(n);
  buf.fill((angle * 0.7) % 360, colorIntensity, 200, 220);
  buf.ellipse(buf.width/2 + radius * cos(angle), buf.height/2 + radius * sin(angle), (elementSize + 2), (elementSize + 2));
  n++;
  bufferNeedsRedraw = true;
}
function drawPell(buf) {
  let angle = n * 75;
  let radius = elementSize * log(n+1);
  buf.fill((angle) % 360, colorIntensity, 255, 180);
  buf.ellipse(buf.width/2 + radius * cos(angle), buf.height/2 + radius * sin(angle), (elementSize + 3), (elementSize + 3));
  n++;
  bufferNeedsRedraw = true;
}
function drawTribonacci(buf) {
  let angle = n * 120;
  let radius = elementSize * 0.8 * sqrt(n);
  buf.fill((n * 3) % 360, colorIntensity, 255, 180);
  buf.ellipse(buf.width/2 + radius * cos(angle), buf.height/2 + radius * sin(angle), (elementSize + 1), (elementSize + 1));
  n++;
  bufferNeedsRedraw = true;
}
function drawPlastic(buf) {
  let angle = n * 130; 
  let radius = elementSize * 0.75 * sqrt(n);
  buf.fill((n*5) % 360, colorIntensity, 200, 220);
  buf.ellipse(buf.width/2 + radius * cos(angle), buf.height/2 + radius * sin(angle), (elementSize + 2), (elementSize + 2));
  n++;
  bufferNeedsRedraw = true;
}
function drawPi(buf) {
  let piDigits = "3141592653589793238462643383";
  let digit = int(piDigits[n % piDigits.length]);
  let angle = map(digit, 0, 9, 0, 360);
  let radius = elementSize * 1.3 * sqrt(n);
  buf.fill((digit * 36) % 360, colorIntensity, 255, 200);
  buf.ellipse(buf.width/2 + radius * cos(angle), buf.height/2 + radius * sin(angle), (elementSize + 2), (elementSize + 2));
  n++;
  bufferNeedsRedraw = true;
}
function drawE(buf) {
  let angle = n * 271.8 % 360;
  let radius = elementSize * 0.8 * sqrt(n);
  buf.fill((n*7) % 360, colorIntensity, 255, 200);
  buf.ellipse(buf.width/2 + radius * cos(angle), buf.height/2 + radius * sin(angle), elementSize, elementSize);
  n++;
  bufferNeedsRedraw = true;
}
function drawCatalan(buf) {
  let angle = n * 45;
  let radius = elementSize * 1.2 * sqrt(n);
  buf.fill((angle) % 360, colorIntensity, 255, 200);
  buf.ellipse(buf.width/2 + radius * cos(angle), buf.height/2 + radius * sin(angle), (elementSize + 4), (elementSize + 4));
  n++;
  bufferNeedsRedraw = true;
}

// --- ALGORITHM DETAILS ---
function updateAlgorithmInfo() {
  const info = {
    fibonacci: {
      title: 'Fibonacci Spiral',
      desc: 'The Fibonacci sequence (0, 1, 1, 2, 3, 5, ...) is found throughout nature, art, and science. The spiral visualizes the golden angle (137.5°), creating patterns seen in sunflowers, pinecones, and shells. Each point is placed at an angle and distance determined by the sequence, forming a visually appealing spiral.'
    },
    lucas: {
      title: 'Lucas Numbers',
      desc: 'Lucas numbers are similar to Fibonacci but start with 2 and 1. They share many properties with Fibonacci numbers and also relate to the golden ratio. Lucas spirals create patterns with subtle differences, often used in advanced mathematics and cryptography.'
    },
    silver: {
      title: 'Silver Ratio',
      desc: 'The silver ratio (1 + √2 ≈ 2.414) is a mathematical constant related to the geometry of squares and octagons. Patterns based on the silver ratio appear in paper sizes, architecture, and crystal structures, producing square-based spirals.'
    },
    pell: {
      title: 'Pell Sequence',
      desc: 'The Pell sequence (0, 1, 2, 5, 12, ...) grows rapidly and is related to the square root of 2. It appears in solutions to certain equations and in continued fractions. The resulting spiral is more stretched and exponential.'
    },
    tribonacci: {
      title: 'Tribonacci Sequence',
      desc: 'Each Tribonacci number is the sum of the previous three (0, 1, 1, 2, 4, 7, ...). This sequence generalizes Fibonacci and creates more complex, triangular patterns, useful in combinatorics and computer science.'
    },
    plastic: {
      title: 'Plastic Number',
      desc: 'The plastic number (≈ 1.3247) is the unique real solution to x³ = x + 1. It appears in architecture and design, especially in proportions of certain minimal surfaces and modern buildings. The spiral is more compact and cubic.'
    },
    pi: {
      title: 'Pi Digit Visualization',
      desc: 'This pattern uses the digits of π (3.14159...) to determine the angle of each point. The result is a pseudo-random, yet deterministic, pattern that reflects the distribution of digits in π, a fundamental constant in mathematics.'
    },
    e: {
      title: 'Euler\'s Number',
      desc: 'Euler\'s number e (≈ 2.718) is the base of natural logarithms and appears in growth, decay, and finance. The spiral visualizes exponential growth, with each point placed according to e-based increments.'
    },
    catalan: {
      title: 'Catalan Numbers',
      desc: 'Catalan numbers (1, 1, 2, 5, 14, ...) count various combinatorial objects, such as valid parenthesis expressions and binary trees. The resulting pattern is highly structured and relates to recursive mathematical problems.'
    }
  };
  const d = info[mode];
  if (d && document.getElementById('infoContent')) {
    document.getElementById('infoContent').innerHTML = `<b>${d.title}</b><br>${d.desc}`;
  }
}

// Patch setMode to update dropdown and algorithm info
function setMode(m) {
  mode = m;
  n = 0;
  patternBuffer.background(0);
  bufferNeedsRedraw = true;
  updateAlgorithmInfo();
  // Sync dropdown selection if present
  var dd = document.getElementById('algoDropdown');
  if (dd && dd.value !== m) dd.value = m;
  // Optionally update the pattern label if present
  var pat = document.getElementById('currentPattern');
  if (pat) pat.textContent = dd ? dd.options[dd.selectedIndex].text : m;
}

// Zoom functions
function zoomIn() {
  zoomLevel = Math.min(zoomLevel * 1.2, 10);
  updateZoomDisplay();
}
function zoomOut() {
  zoomLevel = Math.max(zoomLevel / 1.2, 0.1);
  updateZoomDisplay();
}
function resetZoom() {
  zoomLevel = 1;
  updateZoomDisplay();
}
function updateZoomDisplay() {
  var zl = document.getElementById('zoomLevel');
  var zd = document.getElementById('zoomDisplay');
  if (zl) zl.textContent = Math.round(zoomLevel * 100) + '%';
  if (zd) zd.textContent = Math.round(zoomLevel * 100) + '%';
}

// On load, show initial algorithm info, set dropdown, and zoom display
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', function() {
    updateAlgorithmInfo();
    var dd = document.getElementById('algoDropdown');
    if (dd) {
      dd.value = mode;
      dd.onchange = function() { setMode(this.value); };
    }
    updateZoomDisplay();
  });
}
