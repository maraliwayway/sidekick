from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List
import uuid
import shutil
import os
from fastapi.middleware.cors import CORSMiddleware

# import our new ocr_pipeline
from ocr_pipeline import extract_text_from_image, guess_vitamin, generate_vitamin_summary

app = FastAPI(title="Sidekick Backend API")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- DATABASE MOCKUP --------------------
vitamin_db = {
    "Vitamin C": {"description": "Boosts immunity.", "image_id": "vitamin_c.jpg"},
    "Vitamin D": {"description": "Supports bone health.", "image_id": "vitamin_d.jpg"}
}

drug_db = {
    "Aspirin": {"category": "Heart Health", "side_effects": ["Nausea", "Stomach Bleeding"]},
    "Ibuprofen": {"category": "Pain Relief", "side_effects": ["Dizziness", "Ulcers"]}
}

health_categories = ["Heart Health", "Pain Relief", "Mental Health", "Digestive Health"]

drug_interactions_db = {
    ("Aspirin", "Ibuprofen"): "Increased risk of bleeding."
}

side_effect_rankings = {
    "Aspirin": {"Nausea": 2, "Stomach Bleeding": 5},
    "Ibuprofen": {"Dizziness": 3, "Ulcers": 4}
}

# -------------------- MODELS --------------------
class VitaminSelectionRequest(BaseModel):
    vitamin_name: str

class DrugInfoRequest(BaseModel):
    drug_name: str

class DrugInteractionRequest(BaseModel):
    drug_1: str
    drug_2: str

class SideEffectRankRequest(BaseModel):
    drug_name: str

class CategorySelectionRequest(BaseModel):
    category: str

class RegisterRequest(BaseModel):
    username: str
    email: str

# -------------------- VITAMIN SCAN PIPELINE --------------------

@app.post("/vitamin/scan")
async def scan_vitamin(file: UploadFile = File(...)):
    try:
        # Save uploaded file temporarily
        temp_filename = f"temp_{uuid.uuid4()}.jpg"
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # OCR → LLM pipeline
        ocr_lines = extract_text_from_image(temp_filename)
        predicted_vitamin = guess_vitamin(ocr_lines)
        vitamin_summary = generate_vitamin_summary(predicted_vitamin)

        os.remove(temp_filename)

        return {
            "predicted_vitamin": predicted_vitamin,
            "summary": vitamin_summary
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -------------------- EXISTING VITAMIN PATHS --------------------
@app.post("/vitamin/select")
def select_vitamin(req: VitaminSelectionRequest):
    vitamin = vitamin_db.get(req.vitamin_name)
    if not vitamin:
        raise HTTPException(status_code=404, detail="Vitamin not found.")
    return vitamin

@app.post("/vitamin/validate")
def validate_bottle(scanned_id: str, confirmed_vitamin: str):
    return {"validated": True, "confirmed_vitamin": confirmed_vitamin}

@app.get("/vitamin/alternatives")
def list_alternatives():
    alternatives = list(vitamin_db.keys())[:20]
    return {"alternatives": alternatives}

# -------------------- DRUG PATHS --------------------
@app.get("/drug/categories")
def list_health_categories():
    return {"categories": health_categories}

@app.post("/drug/info")
def get_drug_info(req: DrugInfoRequest):
    drug = drug_db.get(req.drug_name)
    if not drug:
        raise HTTPException(status_code=404, detail="Drug not found.")
    return drug

@app.post("/drug/side_effects")
def rank_side_effects(req: SideEffectRankRequest):
    rankings = side_effect_rankings.get(req.drug_name)
    if not rankings:
        raise HTTPException(status_code=404, detail="Drug side effects not found.")
    sorted_rank = sorted(rankings.items(), key=lambda x: x[1])
    return {"ranked_side_effects": sorted_rank}

@app.post("/drug/interactions")
def check_interactions(req: DrugInteractionRequest):
    interaction = drug_interactions_db.get((req.drug_1, req.drug_2))
    if not interaction:
        return {"interaction": "No known major interaction."}
    return {"interaction": interaction}

@app.post("/drug/vitamin_recommendations")
def recommend_vitamins(req: DrugInfoRequest):
    recommended = ["Vitamin C", "Vitamin D"]
    return {"recommendations": recommended}

# -------------------- HEALTH CHECK + REGISTER --------------------
@app.get("/health")
def health_check():
    return {"status": "Sidekick API is healthy."}

@app.post("/register")
def register(req: RegisterRequest):
    return {"message": f"User {req.username} registered with email {req.email}"}
