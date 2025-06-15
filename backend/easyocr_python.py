import sys
import easyocr
import pandas as pd
import ollama


#filename = sys.argv[1]

# === OCR the Image ===
reader = easyocr.Reader(['en'])

#added the function here
def extract_text_from_image(image_path):
    results = reader.readtext('vitamin_b_work.webp')
    ocr_lines = [result[1] for result in results]  # extract just the text part
    #ocr_text = ' '.join(ocr_lines)  # join into one string
    return ocr_lines

print("📝 OCR Text:")
#commented this out
#print(ocr_text)


# === Prepare vitamin list ===
vitamin_list = [
    "Vitamin A", "Vitamin B1", "Vitamin B2", "Vitamin B3", "Vitamin B5",
    "Vitamin B6", "Vitamin B7", "Vitamin B9", "Vitamin B12", "Vitamin C",
    "Vitamin D", "Vitamin E", "Vitamin K", "Calcium", "Copper", "Iodine",
    "Iron", "Magnesium", "Phosphorus", "Potassium", "Zinc"
]


# === Compose prompt for LLM ===
prompt = f"""
You are a vitamin label expert. Based only on this OCR text from a supplement bottle, guess the most likely main vitamin or mineral it contains.
Only choose from this list:

{vitamin_list}

Return just the vitamin/mineral name only. Look for clues in the text sometimes the vitamin is there in the first few words.

Text:
///changes made- removed ocr_text in brackets from here
"""

# === Initialize Ollama client ===
client = ollama.Client()

# === Generate response from gemma2:2b model ===
model = "gemma:2b"
response = client.generate(model=model, prompt=prompt)

model_output = response.response
print("\n🤖 LLM Guess:\n", model_output) 


# from here on is the extra, before this point its just the guesser 
confirm = input(f"\n💬 Is this the correct vitamin? [{model_output}] (yes/no): ").lower()
 

# === If confirmed, show info from CSV ===
if confirm == "yes":
    try:
        df = pd.read_csv("vitamin_final_filled.csv")

        # Convert the CSV to a string for the prompt
        csv_text = df.to_csv(index=False)

        # Prompt LLM for detailed info based on CSV content
        follow_up_prompt = f"""
You are a vitamin expert. Based on the following CSV data and the detected vitamin "{model_output}", provide a summary of its benefits, and all the other columns 
and then seperatly mention the natural remedies as a suggestion.

CSV:
{csv_text}

Vitamin: {model_output}
"""

        follow_up_response = client.generate(model=model, prompt=follow_up_prompt, stream = True)
        print("\n📄 Vitamin Info from LLM:\n")
        print(follow_up_response.response.strip())

    except Exception as e:
        print(f"\n🚫 Could not read vitamin_info.csv: {e}")
else:
    print("\n📸 Please take another picture with a clearer label.")

