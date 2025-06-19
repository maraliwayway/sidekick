"""
ORIGINAL VERSION OF ORIGINAL_PREDICTION.PY
NO CHANGES TO BE MADE TO THIS VERSION. 
"""

#pip install transformers torch pubchempy scikit-learn pandas numpy


import pandas as pd
import numpy as np
import joblib
import os
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split
from sklearn.multioutput import ClassifierChain
from sklearn.ensemble import RandomForestClassifier

# === Step 1: Load and Filter Dataset ===
df = pd.read_csv("100_meds_interaction_06_13.csv")

# Keep top 50 most frequent side effects
top_conditions = df['condition_meddra_id'].value_counts().nlargest(50).index
filtered_df = df[df['condition_meddra_id'].isin(top_conditions)].copy()

# Generate unique drug pair key
filtered_df['drug_pair'] = filtered_df.apply(
    lambda row: "_".join(sorted([str(row['drug_1_rxnorn_id']), str(row['drug_2_rxnorm_id'])])), axis=1
)

# === USE ALL DRUG PAIRS ===
reduced_df = filtered_df.copy()


# === Step 2: Group and Aggregate ===
grouped = reduced_df.groupby('drug_pair').agg({
    'condition_meddra_id': list,
    'drug_1_rxnorn_id': 'first',
    'drug_2_rxnorm_id': 'first',
    'PRR': 'mean'
}).reset_index()

grouped.rename(columns={
    'drug_1_rxnorn_id': 'drug_1',
    'drug_2_rxnorm_id': 'drug_2',
    'PRR': 'mean_PRR'
}, inplace=True)

# === Step 3: Encode Labels and Train Model ===
X = grouped[['drug_1', 'drug_2', 'mean_PRR']]
mlb = MultiLabelBinarizer()
y = mlb.fit_transform(grouped['condition_meddra_id'])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

base_model = RandomForestClassifier(n_estimators=100, random_state=42)
chain = ClassifierChain(base_model)
chain.fit(X_train, y_train)

# === Step 4: Create Mapping and Save Artifacts ===
side_effect_map = (
    df[['condition_meddra_id', 'condition_concept_name']]
    .drop_duplicates()
    .set_index('condition_meddra_id')['condition_concept_name']
    .to_dict()
)

os.makedirs("ddi_model_package", exist_ok=True)
joblib.dump(chain, "ddi_model_package/ddi_model.pkl")
joblib.dump(mlb, "ddi_model_package/label_binarizer.pkl")
joblib.dump(side_effect_map, "ddi_model_package/meddra_name_map.pkl")

# === Step 5: Prediction Function (Top-5) ===
def predict_top5_side_effects(drug_1_id, drug_2_id, prr_value=1.0):
    pair = pd.DataFrame([[min(drug_1_id, drug_2_id), max(drug_1_id, drug_2_id), prr_value]],
                        columns=['drug_1', 'drug_2', 'mean_PRR'])
    
    probs = chain.predict_proba(pair)[0]
    top5_indices = np.argsort(probs)[-5:][::-1]
    predicted_ids = mlb.classes_[top5_indices]
    
    return [(side_effect_map.get(m, str(m)), probs[i]) for i, m in zip(top5_indices, predicted_ids)]

# === Example Usage ===
#print(predict_top5_side_effects(3322, 2541, prr_value=10.0))
