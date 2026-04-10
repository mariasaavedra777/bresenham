const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');
let resolucionDinamica = 50; 
let tamanoPixel = canvas.width / resolucionDinamica;

/**
 * Dibuja las escalas numéricas en los bordes del canvas.
 */
/**
 * CAMBIO: Ahora dibuja una cuadrícula completa y escala de 5 en 5 unidades.
 */
function dibujarEscalas(ctx, w, h) {
    ctx.strokeStyle = "#eee"; // Gris muy claro para no estorbar la línea
    ctx.fillStyle = "#999";
    ctx.font = "10px Arial";

    // Usamos la resolución dinámica para que la rejilla se ajuste
    for (let i = 0; i <= resolucionDinamica; i++) {
        let pos = i * tamanoPixel;

        // Dibujamos las líneas de la rejilla (verticales y horizontales)
        ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, h); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(w, pos); ctx.stroke();

        // Ponemos los números de 5 en 5 para que se vea limpio
        if (i % 5 === 0) {
            ctx.fillText(i, pos + 2, h - 5); // Números en X
            ctx.fillText(i, 5, pos - 2);     // Números en Y
        }
    }
}
// Llamada inicial
dibujarEscalas(ctx, canvas.width, canvas.height);

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
    // CAMBIO: Ahora dibujamos un cuadro (píxel lógico) en lugar de un punto de 2x2
    ctx.fillStyle = "rgba(52, 152, 219, 0.7)"; // Azul con transparencia para el "sombreado"
    ctx.fillRect(x * tamanoPixel, y * tamanoPixel, tamanoPixel, tamanoPixel);

    // Mantenemos la lógica de la tabla pero con la letra pequeña que pusimos en el CSS
    const tr = `<tr><td>${contador++}</td><td>${x}</td><td>${y}</td><td>${e}</td></tr>`;
    tBody.innerHTML += tr;
}
document.getElementById('btnDibujar').addEventListener('click', () => {
    // 1. Obtener valores
    const x0 = parseInt(document.getElementById('x0').value) || 0;
    const y0 = parseInt(document.getElementById('y0').value) || 0;
    const x1 = parseInt(document.getElementById('x1').value) || 0;
    const y1 = parseInt(document.getElementById('y1').value) || 0;

    // 2. CAMBIO: Calcular escala dinámica (mínimo 50 o el valor máximo ingresado)
    const maxInput = Math.max(x0, y0, x1, y1);
    resolucionDinamica = Math.max(50, maxInput + 5); 
    tamanoPixel = canvas.width / resolucionDinamica;

    // 3. Limpiar y redibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarEscalas(ctx, canvas.width, canvas.height);
    tBody.innerHTML = "";
    contador = 0;

    // 4. Ejecutar algoritmo
    bresenham(x0, y0, x1, y1, graficarPunto);
});