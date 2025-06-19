import pandas as pd
import os
import ollama
import ddi_interaction


PICKLE_PATH = "100_meds_interaction_06_13.pkl"
CSV_PATH = "/Users/mariafahim/Documents/uni /ai lab/sidekick/100_meds_interaction_06_13.csv"

def find_closest_drug_id(drug_name, interaction_df):
    drug_name = drug_name.lower()

    # Combine both concept name columns into one big list
    for _, row in interaction_df.iterrows():
        name1 = str(row['drug_1_concept_name']).lower()
        name2 = str(row['drug_2_concept_name']).lower()

        if drug_name in name1:
            return row['drug_1_rxnorn_id']
        elif drug_name in name2:
            return row['drug_2_rxnorm_id']

    return None

def get_all_possible_names(drug_input, df):
    """Return a set of both brand and generic names that match the input."""
    matches = df[
        df['Drug'].str.lower().str.contains(drug_input, na=False) |
        df['generic_name'].str.lower().str.contains(drug_input, na=False)
    ]
    names = set(matches['Drug'].str.lower()) | set(matches['generic_name'].str.lower())
    return list(names)



# load our merged dataset
df = pd.read_csv("merged_both_2.csv")

if os.path.exists(PICKLE_PATH):
    # print("Loading interaction data from pickle...")
    interaction_df = pd.read_pickle(PICKLE_PATH)
else:
    # print("Loading interaction data from CSV...")
    interaction_df = pd.read_csv(CSV_PATH)
    interaction_df.to_pickle(PICKLE_PATH)  # Save pickle for future use
    # print(f"Pickle saved to {PICKLE_PATH}")# clean out whitespace in key columns we're gonna search in


for col in ['Drug', 'Condition', 'Sides', 'generic_name', 'Method_of_Access', 'pregnancy_category', 'alcohol', 'rating', 'Effectiveness']:
    if col in df.columns:
        df[col] = df[col].astype(str).str.strip()

while True:
    user_input = input("Enter a drug name or medical condition: ").strip().lower()

    matches = df[
        df['Drug'].str.lower().str.contains(user_input, na=False) |
        df['generic_name'].str.lower().str.contains(user_input, na=False) |
        df['Condition'].str.lower().str.contains(user_input, na=False)
    ]

    if not matches.empty:
        break  # Valid input, continue with the rest
    else:
        print(f"Oops! Looks like we don't have any information on: '{user_input}'. Please try again.\n")

# get top 5 unique drugs in the drug column
unique_drugs = matches.drop_duplicates(subset=['Drug'], keep='first').head(5)

# get the value of the row if it exists, else give it "there is no info..."
def safe_get(row, field):
    val = row.get(field, "")
    return val if val and val.lower() != 'nan' else "There is no information on this at this time."

# build formatted drug info strings for the prompt
drug_entries = []
for _, row in unique_drugs.iterrows():
    # print("Processing drug:", row.get('Drug'))
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
    # print("Generated entry:\n", entry)

if len(drug_entries)==0:
    formatted_data = "No information found on the query you provided."
else:
    formatted_data = "\n\n".join(drug_entries)


prompt = f"""
You are a medical data assistant. 
Using only the data provided below, summarize up to 5 drugs related to the user's query.

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


# print("Calling ollama.generate()...")
response = ollama.generate(
    model="gemma:2b",
    prompt=prompt,
    options={"temperature": 0}
)
# print("Response received:")
print(response['response'].strip())

# check if the user inputted a drug 
drug_names = set(df['Drug'].str.lower().str.strip())
generic_names = set(df['generic_name'].str.lower().str.strip())

all_names = drug_names.union(generic_names)

is_drug_input = user_input in all_names
# print(is_drug_input)


if is_drug_input:
    while True:
        next_input = input("Enter another drug name you're taking: ").strip().lower()
        drug_names = set(df['Drug'].str.lower().str.strip())
        generic_names = set(df['generic_name'].str.lower().str.strip())
        all_names = drug_names.union(generic_names)

        if next_input in all_names:
            break  # valid input
        else:
            print(f"Oops! We don't have any information on: '{next_input}'. Please try another drug.\n")

    possible_names = get_all_possible_names(user_input, df)
    drug1_id = None
    for name in possible_names:
        drug1_id = find_closest_drug_id(name, interaction_df)
        if drug1_id:
            break

    possible_names2 = get_all_possible_names(next_input, df)
    drug2_id = None
    for name in possible_names2:
        drug2_id = find_closest_drug_id(name, interaction_df)
        if drug2_id:
            break

    if drug1_id and drug2_id:
        # Try to find an exact match in the dataset (in either order)
        drug_pair_df = interaction_df[
            ((interaction_df['drug_1_rxnorn_id'] == drug1_id) & (interaction_df['drug_2_rxnorm_id'] == drug2_id)) |
            ((interaction_df['drug_1_rxnorn_id'] == drug2_id) & (interaction_df['drug_2_rxnorm_id'] == drug1_id))
        ]

        if not drug_pair_df.empty:
            # Exact interaction already exists in data!
            print(f"Known side effects between {user_input} and {next_input}:")
            conditions = drug_pair_df['condition_concept_name'].unique()
            for c in conditions[:10]:
                print(f"- {c}")
        else:
            # No exact match, but we have both drugs — use the predictive model
            print("Hmm, we couldn't find an exact match between those two drugs. But here's what we predict might happen:\n")
            predictions = ddi_interaction.predict_top5_side_effects(drug1_id, drug2_id, prr_value=1.0)
            for name, prob in predictions[:10]:
                print(f"- {name}")
    else:
        print("Sorry, we couldn't find one or both of those drugs. Please try again.")


