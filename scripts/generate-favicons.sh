#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p public

# Source logo file
SOURCE_LOGO="src/assets/images/logo_complete_single.jpg"

# Create ICO file with multiple sizes
magick convert "$SOURCE_LOGO" -define icon:auto-resize=16,32,48,64 "public/favicon.ico"

echo "Favicon generation complete!" 