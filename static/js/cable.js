document.querySelector("#calculate-cable").addEventListener("click", () => {
    const tension = Number(document.querySelector("#supply").value);
    const current = Number(document.querySelector("#load-current").value);
    const length = Number(document.querySelector("#length").value);
    const section = Number(document.querySelector("#section").value);
    const resistivity = Number(document.querySelector("#material").value);
    const factor = Number(document.querySelector("#system").value);
    const error = document.querySelector("#cable-error");
    const result = document.querySelector("#cable-result");

    if (!(tension > 0 && current >= 0 && length > 0 && section > 0)) {
        error.textContent = "Informe valores válidos maiores que zero.";
        result.textContent = "";
        return;
    }
    error.textContent = "";
    const resistance = resistivity * length * factor / section;
    const drop = resistance * current;
    const percent = drop / tension * 100;
    result.textContent = `Queda: ${drop.toFixed(2)} V (${percent.toFixed(2)}%). Tensão final: ${(tension - drop).toFixed(2)} V.`;
});
