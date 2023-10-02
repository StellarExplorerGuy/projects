#!/bin/bash

# Display a message to indicate the start of the extension building process
echo "Building extension..."

# Remove all existing files and directories in the 'extension' folder
rm -rf extension/*

# Build the React app
echo "Building react-app..."
cd react-app && npm run build
cd ..

# Build the onboarding files
echo "Building onboarding files..."
cd service && npm run build:onboarding
mkdir -p ../extension/assets

# Copy CSS files from 'temp/assets' to 'extension/assets'
cp ../temp/assets/*.css ../extension/assets

# Copy 'onboarding-page.html' from 'temp' to 'extension'
cp ../temp/onboarding-page.html ../extension/
echo "Building onboarding files...Done"

# Build the service-worker files
echo "Building service-worker files..."
cd ../service && npm run build:firefox

# Copy 'service-worker.js' from 'temp' to 'extension'
cp ../temp/service-worker.js ../extension/
echo "Building service-worker files...Done"

# Create extra files needed for the extension
echo "Creating extra files..."
cp ../service/manifest.json ../extension/
cp ../service/128.png ../extension/
cp ../service/onboarding.js ../extension/
echo "Creating extra files...Done"

# Remove unnecessary files
echo "Finalizing..."
rm -f ../extension/*.txt
rm -f ../extension/service-worker2.js

# Display a message to indicate the completion of the extension building process
echo "Building react-app...Done"
