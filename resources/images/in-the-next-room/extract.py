import os
import pyperclip

path = os.path.dirname(os.path.realpath(__file__))
files = os.listdir(path)
for f in files[:]:
    if not(f.endswith((".png", ".jpg", ".jpeg"))):
        files.remove(f)

pyperclip.copy(str(files).replace(",", ",\n"))
print(files)