from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
import os
from datetime import datetime

class CocktailRecipe(BaseModel):
    """Model for AI output on one cocktail"""
    name: str = Field(description="Original, catchy name for the cocktail")
    ingredients: str = Field(description="List of ingredients with precise measurements, separated by newlines")
    description: str = Field(description="Short, engaging description/history of the cocktail (2-3 sentences)")
    music_ambiance: str = Field(description="Music ambiance suggestion that matches the cocktail")
    image_prompt: str = Field(description="Detailed image prompt for MidJourney/SDXL")

def generate_cocktail(user_input):
    """Generate a cocktail recipe using Azure OpenAI and LangChain"""

    # Check if we have Azure configuration
    azure_endpoint = os.environ.get('AZURE_OPENAI_ENDPOINT')
    azure_deployment = os.environ.get('AZURE_OPENAI_DEPLOYMENT')
    api_key = os.environ.get('AZURE_OPENAI_KEY')
    api_version = os.environ.get('AZURE_OPENAI_API_VERSION', '2024-02-15-preview')

    try:
        llm = AzureChatOpenAI(
            azure_endpoint=azure_endpoint,
            azure_deployment=azure_deployment,
            api_key=api_key,
            api_version=api_version,
            temperature=0.7,
            max_tokens=500
        )

        # Output parser
        output_parser = JsonOutputParser(pydantic_object=CocktailRecipe)

        # Create prompt template
        system_template = """You are an expert mixologist creating custom cocktail recipes. 
        Format your response as valid JSON with the following fields:
        - name: An original, catchy name
        - ingredients: A list of ingredients with precise measurements (format as "2 oz Ingredient\n0.5 oz Another")
        - description: A short, engaging description/history (2-3 sentences)
        - music_ambiance: Music ambiance suggestion
        - image_prompt: Detailed visual description for image generation

        {format_instructions}"""

        human_template = """Create a cocktail recipe based on this request: "{user_input}" """

        prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(system_template),
            HumanMessagePromptTemplate.from_template(human_template)
        ]).partial(format_instructions=output_parser.get_format_instructions())

        # Create chain
        chain = prompt | llm | output_parser

        # Invoke the chain
        result = chain.invoke({"user_input": user_input})

        # Cast to dictionary
        return {
            "name": result["name"],
            "ingredients": result["ingredients"],
            "description": result["description"],
            "music_ambiance": result["music_ambiance"],
            "image_prompt": result["image_prompt"]
        }

    except Exception as e:
        print(f"Error calling Azure OpenAI through LangChain: {e}")
