#!/bin/bash

# Set the root directory (default to "../" if not provided)
ROOT_DIR="${1:-../public}"

# Recursively find image files and compress each
find "$ROOT_DIR" -type f \( -iname "*_compressed.jpg" -o -iname "*_compressed.jpeg" -o -iname "*_compressed.png" \) | while read -r FILE; do
  DIRNAME=$(dirname "$FILE")
  BASENAME=$(basename "$FILE")
  NAME="${BASENAME%.*}"
  OUTPUT_FILE="${DIRNAME}/${NAME}.webp"

  echo "Compressing: $FILE → $OUTPUT_FILE"
  ffmpeg -i "$FILE" -c:v libwebp -qscale:v 75 "$OUTPUT_FILE"
  done

echo "✅ All images compressed and saved in their original subdirectories."
