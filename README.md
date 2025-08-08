
# Readme

<center>Documentation file</center>
Flask was used on account of the service structure of the project and its future scalability as well as simplicity.
We can consider a move to uvicorn for better async handling of API calls to the model.
Django was a possibility as it can handle asynchronous tasks too, but for this small scale deployment with time constraints Flask was prefered.
Fastapi would have been a good choice too.

## 1 How to install the app locally?

pip install -r requirements.txt
fill the .env files with your environment variables

npm install 
fill the .env file with localhost variable
npm run dev

# 2 welcome aboard !
## How to launch the app?

The app is bundled together with the docker compose file, if you have docker already, fill in the environment variables 
in the .env files of front and back apps and run it.
There is only on .env file per folder with not prod or dev distinction as time was short.

# /evaluation_MNS/.env

FLASK_APP=wsgi.py
FLASK_ENV=production
AZURE_OPENAI_ENDPOINT=""
AZURE_OPENAI_DEPLOYMENT=""
AZURE_OPENAI_KEY=""
AZURE_OPENAI_API_VERSION=""
SECRET_KEY=
ADMIN_PASSWORD=


All is stored in llm variable for the model.
The password is called in the login route.
The current setup does not use langgraph tools yet, but as they would be useful i recommend a model that handles tools.


# /evaluation_MNS/frontend-react/le_mixologue_augmente/.env

VITE_API_URL=
cd your folder containing the app and the docker compose(i.e evaluation_MNS)
docker compose up --build
Note the absence of '-' in the docker compose command.

## docker compose up --build


in case of launch issue, verify the presence of a wsgi.py file in the root folder, it should be in the github repo.
The ports are the same as defined in the docker-compose file 80 for the React app and 5000 for the flask app

We pull a model from Azure openai, but you could swap in your own dockerized or API model, 
this was developped on an old machine so the API was preferred, i used gpt-4.1-mini as token costs are minimal
with excellent answers, considering the minimal use of tokens and creative nature of the answers expected,
prefer a good and recent model(for production context).


## Fancy trying your ozwn local model ?? Here is one way to do it:

To use your own model replace the imports for azure openai with your own sdk like ollama.
A local model version of the code will require some adjustments, use this app only with an API for now.
I documented some steps before code changes to use a local model.
## These are for guidance only and not functional yet nor necessary to run the app, simply fill the .env variables and use azure api.

# pip install ollama, pip freeze > requirements.txt, then in the docker-compose file
    ollama:
        image: ollama/ollama
        ports:
        - "11434:11434"
        volumes:
        - ollama:/root/.ollama
        deploy:
            resources:
            reservations:
                # Adjust based on which model you're using
                # For 8B model:
                memory: 8G
                # For 70B model:
                # memory: 90G
                # For 405B model:
                # memory: 500G
        command: serve


```python
import os
import requests

def generate_cocktail(user_input):
    if os.getenv('USE_LOCAL_MODEL', 'false').lower() == 'true':
        # Ollama implementation
        response = requests.post(
            "http://ollama:11434/api/generate",
            json={"model": "llama3.1:8b", "prompt": user_input, "stream": False}
        )
        # Parse Ollama response...
    else:
        # Current Azure implementation