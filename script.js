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
/**
 * Algoritmo de Bresenham documentado.
 */
function bresenham(x0, y0, x1, y1, plot) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        plot(x0, y0, err); // Enviamos el punto y el error a la función de dibujo
        if (x0 === x1 && y0 === y1) break;
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
}
let contador = 0;
const tBody = document.querySelector('#tablaPasos tbody');

function graficarPunto(x, y, e) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 2, 2); // Dibuja el pixel

    const tr = `<tr><td>${contador++}</td><td>${x}</td><td>${y}</td><td>${e}</td></tr>`;
    tBody.innerHTML += tr; // Agrega a la tabla
}

document.getElementById('btnDibujar').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarEscalas(ctx, canvas.width, canvas.height);
    tBody.innerHTML = "";
    contador = 0;

    const x0 = parseInt(document.getElementById('x0').value) || 0;
    const y0 = parseInt(document.getElementById('y0').value) || 0;
    const x1 = parseInt(document.getElementById('x1').value) || 0;
    const y1 = parseInt(document.getElementById('y1').value) || 0;

    bresenham(x0, y0, x1, y1, graficarPunto);
});
