import csv
import json

fr_json_path = "C:\dev\CombinedTalentCloud\\tc\\fr copy.json"
fr_json_out_path = "C:\dev\CombinedTalentCloud\\tc\\fr output.json"
translations_path = "C:\dev\CombinedTalentCloud\\tc\Application_translations - Automate Translations.csv"

def get_translations(path):
    with open(translations_path, newline='') as csvfile:
        translations_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        return {row[0]: row[1] for row in translations_reader}

def get_fr(path):
    with open(path) as f:
        data = json.load(f)
    return data

translations = get_translations(translations_path)
fr = get_fr(fr_json_path)
fr_intersect = {key:value for key,value in translations.items() if key in fr}
fr.update(fr_intersect)

with open(fr_json_out_path, 'w') as f:
    json.dump(fr, f, sort_keys=True, indent=2, ensure_ascii=False)

