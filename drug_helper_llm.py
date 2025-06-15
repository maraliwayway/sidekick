

import pandas as pd
import ollama

# load our merged dataset
df = pd.read_csv("merged_both_2.csv")

# clean out whitespace in key columns
for col in ['Drug', 'Condition', 'Sides', 'generic_name', 'Method_of_Access', 'pregnancy_category', 'alcohol', 'rating', 'Effectiveness']:
    if col in df.columns:
        df[col] = df[col].astype(str).str.strip()

# get user input
user_input = input("Enter a drug name or medical condition: ").strip()

# filter for matches in Drug, generic_name, or Condition (case insensitive)
matches = df[
    df['Drug'].str.contains(user_input, case=False, na=False) |
    df['generic_name'].str.contains(user_input, case=False, na=False) |
    df['Condition'].str.contains(user_input, case=False, na=False)
]

# get top 5 unique drugs by 'Drug' column
unique_drugs = matches.drop_duplicates(subset=['Drug'], keep='first').head(5)

def safe_get(row, field):
    val = row.get(field, "")
    return val if val and val.lower() != 'nan' else "There is no information on this at this time."

# build formatted drug info strings for the prompt
drug_entries = []
for _, row in unique_drugs.iterrows():
    entry = f"""Drug Name: {safe_get(row, 'Drug')}
Generic Name: {safe_get(row, 'generic_name')}
Condition: {safe_get(row, 'Condition')}
Side Effects: {safe_get(row, 'Sides')}
Rx or OTC: {safe_get(row, 'Method_of_Access')}
Pregnancy Interaction: {safe_get(row, 'pregnancy_category')}
Alcohol Interaction: {safe_get(row, 'alcohol')}
Rating: {safe_get(row, 'rating')}
Effectiveness: {safe_get(row, 'Effectiveness')}
"""
    drug_entries.append(entry)

if not drug_entries:
    formatted_data = "No drug information found."
else:
    formatted_data = "\n\n".join(drug_entries)

# building the prompt for the LLM
prompt = f"""
You are a medical data assistant. Use only the information below to answer the user's query.

DRUG/CONDITION INFO:
{formatted_data}

Question:
Summarize up to 5 drugs or treatments related to: {user_input}. 
For each one, include the drug name, generic name, condition it treats, side effects, whether it's Rx or OTC, pregnancy interaction, alcohol interaction, rating, and effectiveness.
If any information is missing, say: "There is no information on this at this time."
Do not make anything up.
"""

print("Calling ollama.generate()...")
response = ollama.generate(model="gemma:2b", prompt=prompt)
print("Response received:")
print(response['response'].strip())
