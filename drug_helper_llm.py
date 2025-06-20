import pandas as pd
import os
import ollama
import ddi_interaction

PICKLE_PATH = "100_meds_interaction_06_13.pkl"
CSV_PATH = "/Users/mariafahim/Documents/uni /ai lab/sidekick/100_meds_interaction_06_13.csv"

# Load merged dataset
df = pd.read_csv("merged_both_2.csv")

# Clean text columns
for col in ['Drug', 'Condition', 'Sides', 'generic_name', 'Method_of_Access', 'pregnancy_category', 'alcohol', 'rating', 'Effectiveness']:
    if col in df.columns:
        df[col] = df[col].astype(str).str.lower().str.strip()

# Load or pickle interaction data
if os.path.exists(PICKLE_PATH):
    interaction_df = pd.read_pickle(PICKLE_PATH)
else:
    interaction_df = pd.read_csv(CSV_PATH)
    interaction_df.to_pickle(PICKLE_PATH)

interaction_df['drug_1_concept_name'] = interaction_df['drug_1_concept_name'].astype(str).str.lower().str.strip()
interaction_df['drug_2_concept_name'] = interaction_df['drug_2_concept_name'].astype(str).str.lower().str.strip()

def find_closest_drug_id(drug_name, interaction_df):
    for _, row in interaction_df.iterrows():
        if drug_name in row['drug_1_concept_name']:
            return row['drug_1_rxnorn_id']
        elif drug_name in row['drug_2_concept_name']:
            return row['drug_2_rxnorm_id']
    return None

def safe_get(row, field):
    val = row.get(field, "")
    return val if val and val != 'nan' else "There is no information on this at this time."

# getting initital user input 
while True:
    user_input = input("Enter a drug name or medical condition: ").strip().lower()
    matches = df[
        (df['Drug'] == user_input) |
        (df['generic_name'] == user_input) |
        (df['Condition'].str.contains(user_input))
    ]
    if not matches.empty:
        break
    print(f"Oops! No info found for '{user_input}'. Try again.\n")


unique_drugs = matches.drop_duplicates(subset=['Drug']).head(5)

drug_entries = []
for _, row in unique_drugs.iterrows():
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

formatted_data = "\n\n".join(drug_entries) if drug_entries else "No information found on the query."

prompt = f"""
You are a medical data assistant. Use only the data provided below.

For each drug, list the following in this exact format (do NOT use a table):

Drug Name:  
Generic Name:  
Condition:
Side Effects:  
Rx or OTC: 
Pregnancy Interaction:
Alcohol Interaction:  
Rating:  
Effectiveness: 

If any value is missing, write "There is no information on this at this time."

DATA:
{formatted_data}
"""

response = ollama.generate(model="gemma:2b", prompt=prompt, options={"temperature": 0})
print(response['response'].strip())

# ddi part 
all_drug_names = set(df['Drug']).union(set(df['generic_name']))
interaction_names = set(interaction_df['drug_1_concept_name']).union(set(interaction_df['drug_2_concept_name']))
is_drug_input = user_input in all_drug_names
# get next drug input 
if is_drug_input:
    while True:
        next_input = input("Enter another drug name you're taking: ").strip().lower()
        if next_input in interaction_names:
            # print("found")
            break
        print(f"Oops! No info found for '{next_input}'. Try again.\n")

    drug1_id = find_closest_drug_id(user_input, interaction_df)
    drug2_id = find_closest_drug_id(next_input, interaction_df)

    if drug1_id and drug2_id:
        drug_pair_df = interaction_df[
            ((interaction_df['drug_1_rxnorn_id'] == drug1_id) & (interaction_df['drug_2_rxnorm_id'] == drug2_id)) |
            ((interaction_df['drug_1_rxnorn_id'] == drug2_id) & (interaction_df['drug_2_rxnorm_id'] == drug1_id))
        ]

        if not drug_pair_df.empty:
            print(f"Known side effects between {user_input} and {next_input}:")
            conditions = drug_pair_df['condition_concept_name'].dropna().unique()
            # for c in conditions[:10]:
            #     print(f"- {c}")
            side_effect_list = "\n".join(f"- {c}" for c in conditions[:10])
            prompt = f"""
            Format the following exactly as a bulleted list. Do not change or add any words.

            {side_effect_list}
            """

            response = ollama.generate(
                model="gemma:2b",
                prompt=prompt,
                options={"temperature": 0}
            )

            print(response["response"].strip())

        else:
            print("Hmm, no exact interaction found. Predicting possible side effects...\n")
            predictions = ddi_interaction.predict_top5_side_effects(drug1_id, drug2_id, prr_value=1.0)
            # for name, prob in predictions[:5]:
            #     print(f"- {name}")
            side_effect_list = "\n".join(f"- {name} (probability: {prob:.2f})" for name, prob in predictions[:10])
            prompt = f"""
            Format the following predicted side effects as a bulleted list. Do not change or add anything.

            {side_effect_list}
            """

            response = ollama.generate(
                model="gemma:2b",
                prompt=prompt,
                options={"temperature": 0}
            )

            print(response["response"].strip())

    else:
        print("Sorry, one or both of those drugs were not found in the interaction dataset.")

