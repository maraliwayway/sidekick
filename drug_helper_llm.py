

import pandas as pd
import ollama

# load our merged dataset
df = pd.read_csv("merged_both_2.csv")

# clean out whitespace in key columns we're gonna search in
for col in ['Drug', 'Condition', 'Sides', 'generic_name', 'Method_of_Access', 'pregnancy_category', 'alcohol', 'rating', 'Effectiveness']:
    if col in df.columns:
        df[col] = df[col].astype(str).str.strip()

# get user input
user_input = input("Enter a drug name or medical condition: ").strip().lower()

# check if the user input is in any of our columns we ask about
matches = df[
    df['Drug'].str.lower().str.contains(user_input, na=False) |
    df['generic_name'].str.lower().str.contains(user_input, na=False) |
    df['Condition'].str.lower().str.contains(user_input, na=False)
]

# debug print
print(f"User input: {user_input}")

# get top 5 unique drugs in the drug column
unique_drugs = matches.drop_duplicates(subset=['Drug'], keep='first').head(5)

# get the value of the row if it exists, else give it "there is no info..."
def safe_get(row, field):
    val = row.get(field, "")
    return val if val and val.lower() != 'nan' else "There is no information on this at this time."

# build formatted drug info strings for the prompt
drug_entries = []
for _, row in unique_drugs.iterrows():
    print("Processing drug:", row.get('Drug'))
    entry = f"""
---
Drug Name: {safe_get(row, 'Drug')}
Generic Name: {safe_get(row, 'generic_name')}
Condition: {safe_get(row, 'Condition')}
Side Effects: {safe_get(row, 'Sides')}
Rx or OTC: {safe_get(row, 'Method_of_Access')}
Pregnancy Interaction: {safe_get(row, 'pregnancy_category')}
Alcohol Interaction: {safe_get(row, 'alcohol')}
Rating: {safe_get(row, 'rating')}
Effectiveness: {safe_get(row, 'Effectiveness')}
---
"""

    drug_entries.append(entry)
    print("Generated entry:\n", entry)

if len(drug_entries)==0:
    formatted_data = "No information found on the query you provided."
else:
    formatted_data = "\n\n".join(drug_entries)

# building the prompt for the LLM
# prompt = f"""
# You are a medical data assistant. ONLY use the data provided below to answer the question.

# DATA:
# {formatted_data}

# QUESTION:
# The user asked about: "{user_input}"

# Summarize up to 5 drugs or treatments related to this query. 

# For each one, list:
# - Drug Name
# - Generic Name
# - Condition it treats
# - Side Effects
# - Rx or OTC
# - Pregnancy Interaction
# - Alcohol Interaction
# - Rating
# - Effectiveness

# If any of this info is missing for a drug, say: "There is no information on this at this time."
# If there are no entries in the data, say: "There is no information on this at this time."
# Do not make anything up.
# """
# prompt = f"""
# You are a medical data assistant. 
# Summarize the data below. Give the Drug Name, Condition, Side Effects, Rx or OTC, Pregnancy Interaction, Alcohol Interaction, Rating, and Effectiveness. 
# If any of these values are not present, say "There is no information at this time".
# DATA:
# {formatted_data}
# """

prompt = f"""
You are a medical data assistant. 
Using only the data provided below, summarize up to 5 drugs related to the user's query.

For each drug, list the following in this exact format (do NOT use a table):

**Drug Name:**  
**Generic Name:**  
**Condition:**  
**Side Effects:**  
**Rx or OTC:**  
**Pregnancy Interaction:**  
**Alcohol Interaction:**  
**Rating:**  
**Effectiveness:**  

If any value is missing, write "There is no information on this at this time."

DATA:
{formatted_data}
"""


print("Calling ollama.generate()...")
response = ollama.generate(
    model="gemma:2b",
    prompt=prompt,
    options={"temperature": 0}
)
print("Response received:")
print(response['response'].strip())

# check if the user inputted a drug 
drug_names = df['Drug'].str.lower().unique()
is_drug_input = user_input in drug_names

if is_drug_input:
    next_input = input("Enter another drug name you're taking: ").strip().lower()
    # Now we have both drug inputs: user_input and next_input

    # based on this second drug, look for it in the data, if not heres the prediction 
    # ask shyan if she has a heres what it is prompt 

