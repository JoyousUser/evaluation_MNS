
# Readme

<center>Documentation file</center>
Flask was used on account of the service structure of the project and its future scalability as well as simplicity.
We can consider a move to uvicorn.
Django was a possibility as it handles asynchronous tasks much less well, and for a small scale deployment with time constraints Flask was prefered.
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

We pull a model from Azure openai, but you could swap in your own dockerized or API model, 
this was developped on an old machine so the api was preferred, i used gpt-4.1-mini as token costs are minimal
with excellent answers, considering the minimal use of tokens and creative nature of the answers expected,
prefer a good and recent model(for production context).

To use your own model replace the imports for azure openai with your own sdk like ollama.
# pip install ollama
All is stored in llm variable.

The current setup does not use langgraph tools yet, but as they would be useful i recommend a model that handles tools.


# /evaluation_MNS/frontend-react/le_mixologue_augmente/.env

VITE_API_URL=
cd your folder containing the app and the docker compose(i.e evaluation_MNS)
docker compose up --build
Note the absence of '-' in the docker compose command.

## docker compose up --build

in case of launch issue, verify the presence of a wsgi.py file in the root folder
The ports are the same as defined in the docker-compose file 80 for the React app and 5000 for the flask app

