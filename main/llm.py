"""Modul zur Initialisierung des LLM-Modells für die Indexkarten-Erstellung."""

from langchain_openai import AzureChatOpenAI

from dotenv import load_dotenv
import os

# Lade Umgebungsvariablen aus .env für API-Schlüssel und Endpunkte
load_dotenv()

# Initialisiere beseres Modell für die Indexkarten-Erstellung
model = AzureChatOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-12-01-preview",
    deployment_name="o3-mini",
    reasoning_effort="low" # low, medium, high - low ist am schnellsten und günstigsten und reicht für unseren Anwendungsfall aus
)

# Initialisiere kleineres Modell für Bilderkennung und -interpretation
model_for_images = AzureChatOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-12-01-preview",
    deployment_name="gpt-4.1-nano",
)
