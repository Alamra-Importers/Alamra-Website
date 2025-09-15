#!/bin/bash

# Set the root directory (default to "../" if not provided)
ROOT_DIR="${1:-../public}"

# Recursively find image files and compress each
find "$ROOT_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r FILE; do
  DIRNAME=$(dirname "$FILE")
  BASENAME=$(basename "$FILE")
  EXT="${BASENAME##*.}"
  NAME="${BASENAME%.*}"
  OUTPUT_FILE="${DIRNAME}/${NAME}_compressed.${EXT}"

  echo "Compressing: $FILE → $OUTPUT_FILE"
  ffmpeg -i "$FILE" -q:v 20 "$OUTPUT_FILE"
done

echo "✅ All images compressed and saved in their original subdirectories."
