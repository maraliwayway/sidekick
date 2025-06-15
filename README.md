# sidekick
Your AI-powered health companion for vitamin identification and medication guidance.

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the repository and set up the backend environment

```bash
git clone <your-repo-url>
cd backend
python3 -m venv venv            # Create a virtual environment
source venv/bin/activate       # Activate the virtual environment
pip install -r requirements.txt  # Install dependencies
````

### 2. Configure the frontend

* Open `sidekick/frontend/app/(tabs)/index.tsx`
* Replace the placeholder IP address with your backend server's IP address (e.g., `http://YOUR_IP_ADDRESS:8000`)

### 3. Run the backend server

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 4. Set up and run the frontend

```bash
cd ../frontend
npm install --legacy-peer-deps    # Install frontend dependencies
npx expo start                   # Start the Expo development server
```
