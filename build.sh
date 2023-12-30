#!/bin/bash

echo "build chrome|firefox service-worker"
cd service && npm run build

# Copy manifest
cp chrome/manifest.json ../chrome/
cp chrome/rules_1.json ../chrome/
cp chrome/config.js ../chrome/
cp chrome/service-worker.js ../chrome/
cp firefox/manifest.json ../firefox/
cp firefox/config.js ../firefox/
cp onboarding/onboarding.js ../firefox/
cp 128.png ../firefox/
cp 128.png ../chrome/
cp onboarding.js ../firefox/

#  Copy onboarding
# cp firefox/manifest.json ../firefox/

cd ..

echo "build react-app-modal"
cd react-app && npm run build
cd ../extension

# Remove existing files in chrome and firefox folders
rm -f ../chrome/content.js
rm -f ../chrome/service-worker2.js
rm -f ../firefox/content.js
rm -f ../firefox/service-worker2.js

cd ..
cd react-app

# Copy
cp dist/content.js ../chrome/
cp dist/style.css ../chrome/
cp dist/content.js ../firefox/
cp dist/style.css ../firefox/

mkdir -p ../firefox/assets

cd ..

cp extension/assets/*.css firefox/assets
cp extension/onboarding-page.html firefox/

echo "Copy Resources"
cp service/resources/* chrome/assets/
cp service/resources/* firefox/assets/

echo "Completed!"

