import pandas as pd
from wsgiref.handlers import read_environ

df = pd.read_excel("public/Baseline Data 2022.xlsx", sheet_name="Items")
df2 = pd.read_csv("items.csv")

df["Item"] = df["Item"].str.strip()
df["Item"].sort_values().drop_duplicates().to_csv("test1.txt", index=False)
df2["Item"].sort_values().drop_duplicates().to_csv("test2.txt", index=False)
merged_df = df.merge(df2.drop_duplicates(subset="Item"), on="Item", how="left")
merged_df.to_excel("public/Baseline Data 2022 copy.xlsx", sheet_name="Items")
print(df.shape, merged_df.shape)
df3 = pd.read_excel("public/Baseline Data 2022 copy.xlsx", sheet_name="Items")
df["Item"].to_csv("test3.txt", index=False)
df3["Item"].to_csv("test4.txt", index=False)
