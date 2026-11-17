const display = document.querySelector("#display");
let expression = "";

function update(value) {
    expression = value;
    display.value = expression || "0";
}

document.querySelectorAll("[data-value]").forEach(button => {
    button.addEventListener("click", () => update(expression + button.dataset.value));
});
document.querySelector('[data-action="clear"]').addEventListener("click", () => update(""));
document.querySelector('[data-action="back"]').addEventListener("click", () => update(expression.slice(0, -1)));
document.querySelector('[data-action="equals"]').addEventListener("click", () => {
    if (!expression) return;
    try {
        if (!/^[0-9+\-*/().\s]+$/.test(expression)) throw new Error();
        const result = Function('"use strict"; return (' + expression + ")")();
        if (!Number.isFinite(result)) throw new Error();
        update(String(Number(result.toPrecision(12))));
    } catch {
        display.value = "Erro";
        expression = "";
    }
});
