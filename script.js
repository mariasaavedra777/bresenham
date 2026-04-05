const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

/**
 * Dibuja las escalas numéricas en los bordes del canvas.
 */
function dibujarEscalas(ctx, w, h) {
    ctx.strokeStyle = "#ddd";
    ctx.fillStyle = "#999";
    ctx.font = "9px Arial";

    for (let i = 0; i <= w; i += 50) {
        ctx.fillText(i, i + 2, h - 5);
        ctx.beginPath(); ctx.moveTo(i, h); ctx.lineTo(i, h - 8); ctx.stroke();
    }
    for (let i = 0; i <= h; i += 50) {
        ctx.fillText(i, 5, i - 2);
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(8, i); ctx.stroke();
    }
}
dibujarEscalas(ctx, canvas.width, canvas.height);
