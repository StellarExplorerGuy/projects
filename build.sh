#!/bin/bash

echo "build chrome|firefox service-worker"
cd service && npm run build

# Copy manifest
cp chrome/manifest.json ../chrome/
cp firefox/manifest.json ../firefox/

cd ..

echo "build react-app-modal"
cd react-app && npm run build
cd ../extension

# Remove existing files in chrome and firefox folders
rm -f ../chrome/*.content.js
rm -f ../chrome/content.js
rm -f ../chrome/service-worker2.js
rm -f ../firefox/*.content.js
rm -f ../firefox/content.js
rm -f ../firefox/service-worker2.js

# Copy
cp 128.png ../chrome/
cp *.content.js ../chrome/
cp content.js ../chrome/
cp 128.png ../firefox/
cp *.content.js ../firefox/
cp content.js ../firefox/

echo "Completed!"
