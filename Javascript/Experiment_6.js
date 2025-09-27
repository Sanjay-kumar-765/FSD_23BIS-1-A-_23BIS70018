// script.js - external JS for SVG drawing tool
const svg = document.getElementById('drawingCanvas');
const modeSelect = document.getElementById('modeSelect');
const strokeWidthInput = document.getElementById('strokeWidth');
const strokeColorInput = document.getElementById('strokeColor');
const clearBtn = document.getElementById('clearBtn');
const undoBtn = document.getElementById('undoBtn');

let isDrawing = false;
let startPoint = null;
let currentElement = null;
let elements = []; // stack for undo

// ✅ FIXED: Accurate mouse-to-SVG coordinate mapping
function ptFromEvent(evt) {
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function createSVG(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

svg.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return; // only left button
  isDrawing = true;
  startPoint = ptFromEvent(e);
  const stroke = strokeColorInput.value;
  const width = strokeWidthInput.value || 2;
  const mode = modeSelect.value;

  if (mode === 'free') {
    currentElement = createSVG('path', {
      d: `M ${startPoint.x} ${startPoint.y}`,
      stroke: stroke,
      'stroke-width': width,
      fill: 'none',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    });
    svg.appendChild(currentElement);
  } else if (mode === 'rect') {
    currentElement = createSVG('rect', {
      x: startPoint.x,
      y: startPoint.y,
      width: 0,
      height: 0,
      stroke: stroke,
      'stroke-width': width,
      fill: 'none'
    });
    svg.appendChild(currentElement);
  } else if (mode === 'line') {
    currentElement = createSVG('line', {
      x1: startPoint.x,
      y1: startPoint.y,
      x2: startPoint.x,
      y2: startPoint.y,
      stroke: stroke,
      'stroke-width': width
    });
    svg.appendChild(currentElement);
  } else if (mode === 'circle') {
    currentElement = createSVG('ellipse', {
      cx: startPoint.x,
      cy: startPoint.y,
      rx: 0,
      ry: 0,
      stroke: stroke,
      'stroke-width': width,
      fill: 'none'
    });
    svg.appendChild(currentElement);
  }
});

svg.addEventListener('mousemove', (e) => {
  if (!isDrawing || !currentElement) return;
  const p = ptFromEvent(e);
  const mode = modeSelect.value;

  if (mode === 'free') {
    const d = currentElement.getAttribute('d');
    currentElement.setAttribute('d', d + ` L ${p.x} ${p.y}`);
  } else if (mode === 'rect') {
    const x = Math.min(p.x, startPoint.x);
    const y = Math.min(p.y, startPoint.y);
    const w = Math.abs(p.x - startPoint.x);
    const h = Math.abs(p.y - startPoint.y);
    currentElement.setAttribute('x', x);
    currentElement.setAttribute('y', y);
    currentElement.setAttribute('width', w);
    currentElement.setAttribute('height', h);
  } else if (mode === 'line') {
    currentElement.setAttribute('x2', p.x);
    currentElement.setAttribute('y2', p.y);
  } else if (mode === 'circle') {
    const rx = Math.abs(p.x - startPoint.x);
    const ry = Math.abs(p.y - startPoint.y);
    currentElement.setAttribute('rx', rx);
    currentElement.setAttribute('ry', ry);
  }
});

function finishDrawing() {
  if (currentElement) {
    elements.push(currentElement);
    currentElement = null;
  }
  isDrawing = false;
  startPoint = null;
}

svg.addEventListener('mouseup', () => { finishDrawing(); });
svg.addEventListener('mouseleave', () => { finishDrawing(); });

clearBtn.addEventListener('click', () => {
  elements.forEach(el => el.remove());
  elements = [];
});

undoBtn.addEventListener('click', () => {
  const last = elements.pop();
  if (last) last.remove();
});

// cancel drawing with Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (currentElement) { currentElement.remove(); currentElement = null; }
    isDrawing = false;
    startPoint = null;
  }
});

// disable context menu on svg
svg.addEventListener('contextmenu', (e) => e.preventDefault());
