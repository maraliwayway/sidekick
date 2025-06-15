# sidekick

environment setup

setup venv first

OR

instead of making your own venv, do this:
git clone <your-repo-url>
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

0. put ip address
1. cd backend
2. uvicorn main:app --host 0.0.0.0 --port 8000
3. cd ..
4. cd frontend
5. npx expo start
6. npm install --legacy-peer-deps

