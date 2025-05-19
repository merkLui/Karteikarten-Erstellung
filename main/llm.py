import math
import numexpr

from langchain_core.tools import tool
#from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import AzureChatOpenAI

from dotenv import load_dotenv
import os

load_dotenv()

@tool
def calculator(expression: str) -> str:
    """Calculate expression using Python's numexpr library.

    Expression should be a single line mathematical expression
    that solves the problem.

    Examples:
        "37593 * 67" for "37593 times 67"
        "37593**(1/5)" for "37593^(1/5)"
    """
    local_dict = {"pi": math.pi, "e": math.e}
    return str(
        numexpr.evaluate(
            expression.strip(),
            global_dict={},  # restrict access to globals
            local_dict=local_dict,  # add common mathematical functions
        )
    )

#api_key = os.getenv("GOOGLE_API_KEY")

#model_large = ChatGoogleGenerativeAI(
#    model="gemini-2.5-flash-preview-04-17", 
#    api_key=api_key
#)

#model_small = ChatGoogleGenerativeAI(
#    model="gemini-2.0-flash",
#    api_key=api_key
#)
#model_for_images = ChatGoogleGenerativeAI(
#    model="gemini-2.0-flash-lite", 
#    api_key=api_key
#)

model = AzureChatOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-12-01-preview",
    deployment_name="o3-mini",
    reasoning_effort="high"
)

model_for_images = AzureChatOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-12-01-preview",
    deployment_name="gpt-4.1-nano",
)

tools = [calculator]