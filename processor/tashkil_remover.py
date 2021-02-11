import sys
import pyarabic.araby as araby

ayah = sys.argv[1]
ayah = araby.strip_tatweel(ayah)
ayah = araby.strip_tashkeel(ayah)
ayah = araby.normalize_ligature(ayah)
ayah = araby.normalize_hamza(ayah)
ayah = araby.normalize_alef(ayah)
ayah = araby.normalize_teh(ayah)
ayah = ayah.replace("ے", "ى")

print(ayah)
sys.stdout.flush()