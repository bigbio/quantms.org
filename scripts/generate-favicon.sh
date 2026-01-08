#!/bin/bash

# Input image path
INPUT_IMAGE="src/assets/images/logo_complete-crop.png"
OUTPUT_DIR="public"

# Create temporary directory
TEMP_DIR=$(mktemp -d)

# Generate different sizes
convert "$INPUT_IMAGE" -resize 16x16 "$TEMP_DIR/favicon-16.png"
convert "$INPUT_IMAGE" -resize 32x32 "$TEMP_DIR/favicon-32.png"
convert "$INPUT_IMAGE" -resize 48x48 "$TEMP_DIR/favicon-48.png"
convert "$INPUT_IMAGE" -resize 64x64 "$TEMP_DIR/favicon-64.png"

# Combine all sizes into one .ico file
convert "$TEMP_DIR/favicon-16.png" "$TEMP_DIR/favicon-32.png" "$TEMP_DIR/favicon-48.png" "$TEMP_DIR/favicon-64.png" "$OUTPUT_DIR/favicon.ico"

# Generate PNG versions for modern browsers
cp "$TEMP_DIR/favicon-16.png" "$OUTPUT_DIR/favicon-16x16.png"
cp "$TEMP_DIR/favicon-32.png" "$OUTPUT_DIR/favicon-32x32.png"
cp "$TEMP_DIR/favicon-48.png" "$OUTPUT_DIR/favicon-48x48.png"
cp "$TEMP_DIR/favicon-64.png" "$OUTPUT_DIR/favicon-64x64.png"

# Clean up temporary directory
rm -rf "$TEMP_DIR"

echo "Favicon generation complete!" 