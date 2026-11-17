# Ferramentas Tech

Site de ferramentas técnicas desenvolvido com Python e Flask.

## Executar localmente

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
py app.py
```

Acesse `http://127.0.0.1:5000`.

## Testes

```powershell
py -m unittest discover -s tests -v
```
