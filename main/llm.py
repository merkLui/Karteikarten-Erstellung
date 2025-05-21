"""Modul zur Initialisierung des LLM-Modells für die Indexkarten-Erstellung."""

from langchain_openai import AzureChatOpenAI

from dotenv import load_dotenv
import os

load_dotenv()

# Chat-Modell für Textgesteuerte Karteikartenerstellung
model = AzureChatOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-12-01-preview",
    deployment_name="o3-mini",
    reasoning_effort="low"
)

# Modell für Bilderkennung und Bildinterpretation
model_for_images = AzureChatOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-12-01-preview",
    deployment_name="gpt-4.1-nano",
)
