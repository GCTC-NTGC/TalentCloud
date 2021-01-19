"""Combines translated strings from a spreadsheet with a fr.json file.

This utility assumes you have already run `npm run translations`, so that
fr.json already contains keys for all the strings you want translated, but some
of those keys still have english values.

The spreadsheet must be a csv file with only two columns: the key (matching a
key in fr.json), and the french string value.

Before running this script, update the path variables to match the absolute
paths in your local environment:
  fr_json_path -> path to the current fr.json file.
  fr_json_out_path -> where you want the updated fr.json file to be created
  translations_path -> path to the csv file

After updating the path variables, run this script with
`py ./etc/scripts/replace_fr_translations.py`. The original fr.json file
will not be edited, so if you are happy with the results, overwrite fr.json
with the outputted file.

Note: this script creates a copy of fr.json, overwriting any values whose key
also appears in the csv file. It will not append new keys to the json file,
ie keys which appear in the csv but not fr.json will be ignored.
"""

import csv
import json

fr_json_path = "C:\dev\CombinedTalentCloud\\tc\\resources\\assets\js\\translations\locales\\fr.json"
fr_json_out_path = "C:\dev\\fr output.json"
translations_path = "C:\dev\Application_translations - Automate Translations.csv"

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

