const digits = [
    ["Preto", 0, "#111827"], ["Marrom", 1, "#92400e"], ["Vermelho", 2, "#dc2626"],
    ["Laranja", 3, "#f97316"], ["Amarelo", 4, "#facc15"], ["Verde", 5, "#16a34a"],
    ["Azul", 6, "#2563eb"], ["Violeta", 7, "#7c3aed"], ["Cinza", 8, "#64748b"], ["Branco", 9, "#e5e7eb"]
];
const multipliers = [
    ["Preto", 1, "#111827"], ["Marrom", 10, "#92400e"], ["Vermelho", 100, "#dc2626"],
    ["Laranja", 1000, "#f97316"], ["Amarelo", 10000, "#facc15"], ["Verde", 100000, "#16a34a"],
    ["Azul", 1000000, "#2563eb"], ["Violeta", 10000000, "#7c3aed"], ["Cinza", 100000000, "#64748b"],
    ["Dourado", 0.1, "#ca8a04"], ["Prata", 0.01, "#94a3b8"]
];
const tolerances = [
    ["Marrom", "±1%", "#92400e"], ["Vermelho", "±2%", "#dc2626"], ["Verde", "±0,5%", "#16a34a"],
    ["Azul", "±0,25%", "#2563eb"], ["Violeta", "±0,1%", "#7c3aed"], ["Cinza", "±0,05%", "#64748b"],
    ["Dourado", "±5%", "#ca8a04"], ["Prata", "±10%", "#94a3b8"]
];

function fill(id, values) {
    const select = document.querySelector(id);
    values.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = item[0];
        select.appendChild(option);
    });
}
fill("#r-band1", digits);
fill("#r-band2", digits);
fill("#r-band3", multipliers);
fill("#r-band4", tolerances);
document.querySelector("#r-band3").value = "2";
document.querySelector("#r-band4").value = "6";

function update() {
    const band1 = digits[Number(document.querySelector("#r-band1").value)];
    const band2 = digits[Number(document.querySelector("#r-band2").value)];
    const band3 = multipliers[Number(document.querySelector("#r-band3").value)];
    const band4 = tolerances[Number(document.querySelector("#r-band4").value)];
    ["band1", "band2", "band3", "band4"].forEach((id, index) => {
        document.querySelector("#" + id).style.background = [band1, band2, band3, band4][index][2];
    });
    const ohms = (band1[1] * 10 + band2[1]) * band3[1];
    document.querySelector("#resistor-result").textContent = formatOhms(ohms) + " " + band4[1];
}
function formatOhms(value) {
    if (value >= 1000000) return (value / 1000000).toLocaleString("pt-BR") + " MΩ";
    if (value >= 1000) return (value / 1000).toLocaleString("pt-BR") + " kΩ";
    return value.toLocaleString("pt-BR") + " Ω";
}
document.querySelectorAll(".field-grid select").forEach(select => select.addEventListener("change", update));
update();
