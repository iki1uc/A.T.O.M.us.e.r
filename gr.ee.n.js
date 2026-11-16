// gr.ee.n.js — GR.EE.N · Der Grüne · Der Wanderer
// A.T.O.M.us.e.r · SONDER · Mächtigster Loader
// Alt raus: SVG animateMotion allein
// Neu rein: JS, Canvas, ATOM wandert selbst
// Echter Key: lokal. Nie hier. Nie in Discord. Nie im Public-Repo.

const SONDER = "A.T.O.M.us.e.r · SONDER · MÄCHTIGSTER LOADER";
const HOME = 40;

// Dreieck: ZOOM -> ZO.OM -> Z.O.O.M -> ZOOM
const PUNKTE = [
  { x: 300, y: 80,  name: "ZOOM",  sub: "sehen" },
  { x: 120, y: 380, name: "ZO.OM", sub: "trennen" },
  { x: 480, y: 380, name: "Z.O.O.M", sub: "zerlegen" },
];
const CENTER = { x: 300, y: 260, name: "ZOOMEND", sub: "bewegen" };

function startGreen(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let t = 0; // 0..1, 6s Loop

  function lerp(a, b, f) { return a + (b - a) * f; }

  function posAt(f) {
    // 3 Kanten, je 1/3
    const seg = Math.min(2, Math.floor(f * 3));
    const local = (f * 3) - seg;
    const a = PUNKTE[seg];
    const b = PUNKTE[(seg + 1) % 3];
    return { x: lerp(a.x, b.x, local), y: lerp(a.y, b.y, local), seg };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // BG
    ctx.fillStyle = "#081018";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Kanten
    ctx.strokeStyle = "#4ade80";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(PUNKTE[0].x, PUNKTE[0].y);
    ctx.lineTo(PUNKTE[1].x, PUNKTE[1].y);
    ctx.lineTo(PUNKTE[2].x, PUNKTE[2].y);
    ctx.closePath();
    ctx.stroke();

    // Knoten
    ctx.font = "22px monospace";
    ctx.textAlign = "center";
    for (const p of PUNKTE) {
      ctx.fillStyle = "#111827";
      ctx.beginPath(); ctx.arc(p.x, p.y, 55, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#4ade80"; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = "#e6edf7"; ctx.fillText(p.name, p.x, p.y - 5);
      ctx.fillStyle = "#9ca3af"; ctx.font = "14px monospace";
      ctx.fillText(p.sub, p.x, p.y + 18);
      ctx.font = "22px monospace";
    }

    // Mitte
    ctx.fillStyle = "#f59e0b";
    ctx.font = "18px monospace";
    ctx.fillText(CENTER.name, CENTER.x, CENTER.y);
    ctx.fillText(CENTER.sub, CENTER.x, CENTER.y + 25);

    // GRÜNER WANDERER — animated circle
    const pos = posAt(t);
    ctx.fillStyle = "#4ade80";
    ctx.beginPath(); ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2); ctx.fill();

    // Status unten
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px monospace";
    ctx.fillText(SONDER + " · HOME " + HOME + " · t " + t.toFixed(2), 300, 505);

    // 6s Loop, wie im SVG
    t += 1 / (60 * 6);
    if (t >= 1) t = 0;
    requestAnimationFrame(draw);
  }
  draw();
}

// Start: <canvas id="green" width="600" height="520"></canvas>
// startGreen("green");
