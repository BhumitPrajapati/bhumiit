// inner-page background: GitHub-contribution-graph style grid of cells that light up like commits
const canvas = document.getElementById('bg-canvas');

if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, cols, rows, cells;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CELL = 10;
  const GAP = 3;
  const STEP = CELL + GAP;
  const RADIUS = 2;

  function hexToRgb(hex) {
    const m = hex.replace('#', '').match(/.{1,2}/g);
    if (!m) return [95, 209, 192];
    return m.map(x => parseInt(x, 16));
  }
  function getAccent() {
    return getComputedStyle(document.body).getPropertyValue('--accent').trim();
  }
  function roundRect(x, y, size, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + size, y, x + size, y + size, r);
    ctx.arcTo(x + size, y + size, x, y + size, r);
    ctx.arcTo(x, y + size, x, y, r);
    ctx.arcTo(x, y, x + size, y, r);
    ctx.closePath();
  }

  function buildGrid() {
    cols = Math.ceil(w / STEP) + 1;
    rows = Math.ceil(h / STEP) + 1;
    cells = new Float32Array(cols * rows); // current brightness 0..1
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    buildGrid();
  }
  window.addEventListener('resize', resize);
  resize();

  // periodically "commit" to random cells with a random intensity
  function spark() {
    const n = 1 + Math.floor(Math.random() * 2);
    for (let k = 0; k < n; k++) {
      const idx = Math.floor(Math.random() * cells.length);
      cells[idx] = 0.4 + Math.random() * 0.6;
    }
  }
  setInterval(spark, 120);

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const [r, g, b] = hexToRgb(getAccent());

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const idx = i * rows + j;
        let v = cells[idx] || 0;

        const x = i * STEP;
        const y = j * STEP;

        // base dim cell (always faintly visible, like empty contribution squares)
        const baseAlpha = 0.06;
        const glowAlpha = baseAlpha + v * 0.85;

        ctx.fillStyle = `rgba(${r},${g},${b},${glowAlpha})`;
        roundRect(x, y, CELL, RADIUS);
        ctx.fill();

        if (v > 0.01) {
          cells[idx] = v * 0.965; // slow decay
        }
      }
    }

    if (!reduceMotion) requestAnimationFrame(draw);
    else setTimeout(draw, 200);
  }
  draw();
}
