# === ddi_predictor.py ===
import pandas as pd
import numpy as np
import joblib

# load the trained ddi model 
# check if a drug pair has known side effects in the dataset 
# if not, uses the predictive model to suggest likely side effects 

# Load the trained model and label stuff
chain = joblib.load("ddi_model_package/ddi_model.pkl")
mlb = joblib.load("ddi_model_package/label_binarizer.pkl")
side_effect_map = joblib.load("ddi_model_package/meddra_name_map.pkl")

# Load the interaction dataset
df_interactions = pd.read_csv("100_meds_interaction_06_13.csv")

# Create name → ID map
drug_name_to_id = {}
# store each drug name and its corresponding ID 
# so u can later look up a drugs ID by name
for _, row in df_interactions.iterrows():
    drug_name_to_id[row['drug_1_concept_name'].strip().lower()] = row['drug_1_rxnorn_id']
    drug_name_to_id[row['drug_2_concept_name'].strip().lower()] = row['drug_2_rxnorm_id']

# Known pairs
# creates a drug_pair key for each row in the form id1_id2 sorted 
# stores all known pairs in a set so its easy to check later 
df_interactions['drug_pair'] = df_interactions.apply(
    lambda row: "_".join(sorted([str(row['drug_1_rxnorn_id']), str(row['drug_2_rxnorm_id'])])), axis=1
)
known_pairs = set(df_interactions['drug_pair'])

# returns the top 5 most likely side effects with names and probabilities
def predict_top5_side_effects(drug_1_id, drug_2_id, prr_value=1.0):
    pair = pd.DataFrame([[min(drug_1_id, drug_2_id), max(drug_1_id, drug_2_id), prr_value]],
                        columns=['drug_1', 'drug_2', 'mean_PRR'])
    
    probs = chain.predict_proba(pair)[0]
    top5_indices = np.argsort(probs)[-5:][::-1]
    predicted_ids = mlb.classes_[top5_indices]
    
    return [(side_effect_map.get(m, str(m)), probs[i]) for i, m in zip(top5_indices, predicted_ids)]

# Master function
def get_interaction_info(drug1_name, drug2_name):
    drug1 = drug_name_to_id.get(drug1_name.strip().lower())
    drug2 = drug_name_to_id.get(drug2_name.strip().lower())
    # takes two drug names from user, looks up their ids ,
    # if either is missing return a msg and empty list 
    # if not use the model to predict top 5 side effects 
    if drug1 is None or drug2 is None:
        return "One or both drugs not found in the interaction database.", []

    pair_key = "_".join(sorted([str(drug1), str(drug2)]))
    if pair_key in known_pairs:
        known_effects = df_interactions[df_interactions['drug_pair'] == pair_key]['condition_concept_name'].unique()
        return "This drug pair has known side effects.", list(known_effects)
    else:
        predicted = predict_top5_side_effects(drug1, drug2)
        return "Predicted side effects (no known data):", predicted
