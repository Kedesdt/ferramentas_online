from flask import Flask, Response, render_template, request, redirect, url_for
from io import BytesIO

try:
    import qrcode
except ImportError:
    qrcode = None

app = Flask(__name__)


@app.context_processor
def utility_processor():
    return {"app_name": "Ferramentas Tech"}


@app.route("/")
def index():
    tools = [
        {"name": "Calculadora", "description": "Operações básicas e científicas.", "icon": "calculator", "url": url_for("calculator")},
        {"name": "Calculadora gráfica", "description": "Desenhe funções em um plano cartesiano.", "icon": "chart", "url": url_for("graph")},
        {"name": "Gerador de QR Code", "description": "Crie QR Codes para texto, URLs e contatos.", "icon": "qr", "url": url_for("qrcode_page")},
        {"name": "Lei de Ohm", "description": "Calcule tensão, corrente, resistência e potência.", "icon": "bolt", "url": url_for("ohm")},
        {"name": "Código de cores", "description": "Identifique resistores pelo código de cores.", "icon": "resistor", "url": url_for("resistor")},
        {"name": "Queda de tensão", "description": "Estime a queda em cabos elétricos.", "icon": "cable", "url": url_for("cable_drop")},
    ]
    return render_template("index.html", tools=tools)


@app.route("/calculadora")
def calculator():
    return render_template("calculator.html")


@app.route("/grafico")
def graph():
    return render_template("graph.html")


@app.route("/qr-code")
def qrcode_page():
    return render_template("qrcode.html")


@app.route("/qr-code/image")
def qrcode_image():
    value = request.args.get("value", "").strip()
    if not value:
        return redirect(url_for("qrcode_page"))
    if qrcode is None:
        return "Instale a dependencia 'qrcode' para usar este recurso.", 503

    qr = qrcode.QRCode(version=None, box_size=10, border=4)
    qr.add_data(value)
    qr.make(fit=True)
    image = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return Response(buffer.getvalue(), mimetype="image/png")


@app.route("/lei-de-ohm")
def ohm():
    return render_template("ohm.html")


@app.route("/resistor")
def resistor():
    return render_template("resistor.html")


@app.route("/queda-de-tensao")
def cable_drop():
    return render_template("cable_drop.html")


@app.route("/produto")
def product():
    name = request.args.get("name", "Produto recomendado")
    url = request.args.get("url", "")
    return render_template("product_redirect.html", name=name, url=url)


if __name__ == "__main__":
    app.run(debug=True)
