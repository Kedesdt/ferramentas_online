const fields = ["voltage", "current", "resistance", "power"].reduce((values, id) => {
    values[id] = document.querySelector("#" + id);
    return values;
}, {});
const get = id => fields[id].value === "" ? null : Number(fields[id].value);

document.querySelector("#calculate-ohm").addEventListener("click", () => {
    let V = get("voltage"), I = get("current"), R = get("resistance"), P = get("power");
    let changed = true;
    for (let step = 0; step < 10 && changed; step++) {
        changed = false;
        if (V === null && I !== null && R !== null) { V = I * R; changed = true; }
        if (I === null && V !== null && R !== null && R !== 0) { I = V / R; changed = true; }
        if (R === null && V !== null && I !== null && I !== 0) { R = V / I; changed = true; }
        if (P === null && V !== null && I !== null) { P = V * I; changed = true; }
        if (V === null && P !== null && I !== null && I !== 0) { V = P / I; changed = true; }
        if (I === null && P !== null && R !== null && R !== 0) { I = Math.sqrt(P / R); changed = true; }
        if (R === null && P !== null && I !== null && I !== 0) { R = P / (I * I); changed = true; }
    }
    const count = [V, I, R, P].filter(value => value !== null).length;
    document.querySelector("#ohm-error").textContent = count < 2 ? "Informe pelo menos dois valores." : "";
    if (count >= 2) {
        document.querySelector("#ohm-result").textContent =
            `V = ${format(V)} V | I = ${format(I)} A | R = ${format(R)} Ω | P = ${format(P)} W`;
    }
});

document.querySelector("#clear-ohm").addEventListener("click", () => {
    Object.values(fields).forEach(field => field.value = "");
    document.querySelector("#ohm-error").textContent = "";
    document.querySelector("#ohm-result").textContent = "";
});

function format(value) {
    return value === null ? "—" : Number(value.toPrecision(6)).toLocaleString("pt-BR");
}
