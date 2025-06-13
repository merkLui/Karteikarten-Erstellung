import azure.functions as func

# FastAPI-Instanz, die du schon in main/api.py definiert hast
from main.api import app as fastapi_app

# Azure Functions erwartet eine Funktion namens main()
def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.AsgiMiddleware(fastapi_app).handle(req)