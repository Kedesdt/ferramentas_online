const canvas = document.querySelector("#graph");
const context = canvas.getContext("2d");
const input = document.querySelector("#function-input");

function parseExpression(expression) {
    let normalized = expression.toLowerCase()
        .replace(/\^/g, "**")
        .replace(/\bsin\b/g, "Math.sin")
        .replace(/\bcos\b/g, "Math.cos")
        .replace(/\btan\b/g, "Math.tan")
        .replace(/\bsqrt\b/g, "Math.sqrt")
        .replace(/\babs\b/g, "Math.abs")
        .replace(/\blog\b/g, "Math.log")
        .replace(/\bexp\b/g, "Math.exp")
        .replace(/\bpi\b/g, "Math.PI")
        .replace(/\be\b/g, "Math.E");
    if (!/^[0-9x+\-*\/().\sA-Za-z]+$/.test(normalized)) throw new Error();
    if (!/\b(x|Math\.)/.test(normalized) && normalized !== "") throw new Error();
    return Function("x", "use strict; return " + normalized);
}

function draw() {
    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    const scale = 40;
    const originX = width / 2;
    const originY = height / 2;
    context.strokeStyle = "#e2e8f0";
    context.lineWidth = 1;
    for (let x = originX % scale; x < width; x += scale) {
        context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
    }
    for (let y = originY % scale; y < height; y += scale) {
        context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
    }
    context.strokeStyle = "#64748b";
    context.lineWidth = 2;
    context.beginPath(); context.moveTo(0, originY); context.lineTo(width, originY); context.stroke();
    context.beginPath(); context.moveTo(originX, 0); context.lineTo(originX, height); context.stroke();

    let fn;
    try { fn = parseExpression(input.value); }
    catch {
        context.fillStyle = "#dc2626";
        context.font = "16px Segoe UI";
        context.fillText("Função inválida", 20, 30);
        return;
    }
    context.strokeStyle = "#2563eb";
    context.lineWidth = 3;
    context.beginPath();
    let drawing = false;
    for (let px = 0; px <= width; px++) {
        const x = (px - originX) / scale;
        const yValue = fn(x);
        const py = originY - yValue * scale;
        if (!Number.isFinite(py) || py < -height || py > height * 2) {
            drawing = false;
        } else if (!drawing) {
            context.moveTo(px, py);
            drawing = true;
        } else {
            context.lineTo(px, py);
        }
    }
    context.stroke();
}

document.querySelector("#plot-button").addEventListener("click", draw);
draw();
