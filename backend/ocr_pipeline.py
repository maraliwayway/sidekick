import easyocr
import ollama
import pandas as pd

# Load easyocr + ollama only once
reader = easyocr.Reader(['en'])
client = ollama.Client()

vitamin_list = [
    "Vitamin A", "Vitamin B1", "Vitamin B2", "Vitamin B3", "Vitamin B5",
    "Vitamin B6", "Vitamin B7", "Vitamin B9", "Vitamin B12", "Vitamin C",
    "Vitamin D", "Vitamin E", "Vitamin K", "Calcium", "Copper", "Iodine",
    "Iron", "Magnesium", "Phosphorus", "Potassium", "Zinc"
]

# OCR Function
def extract_text_from_image(image_path):
    results = reader.readtext(image_path)
    ocr_lines = [result[1] for result in results]
    return ocr_lines

# LLM vitamin predictor
def guess_vitamin(ocr_lines):
    ocr_text = ' '.join(ocr_lines)
    prompt = f"""
You are a vitamin label expert. Based only on this OCR text from a supplement bottle, guess the most likely main vitamin or mineral it contains.
Only choose from this list:

{vitamin_list}

Text:
{ocr_text}
"""
    response = client.generate(model="gemma:2b", prompt=prompt)
    return response.response.strip()

# Generate summary after confirmed vitamin
def generate_vitamin_summary(vitamin_name):
    df = pd.read_csv("vitamin_final_filled.csv")
    csv_text = df.to_csv(index=False)
    follow_up_prompt = f"""
You are a vitamin expert. Based on the following CSV data and the detected vitamin "{vitamin_name}", provide a summary of its benefits and all columns.
Then separately mention natural remedies as a suggestion.

CSV:
{csv_text}

Vitamin: {vitamin_name}
"""
    response = client.generate(model="gemma:2b", prompt=follow_up_prompt)
    return response.response.strip()
