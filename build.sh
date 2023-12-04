#!/bin/bash

echo "build chrome|firefox service-worker"
cd service && npm run build

# Copy manifest
cp chrome/manifest.json ../chrome/
cp firefox/manifest.json ../firefox/
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
rm -f ../chrome/*.js
# rm -f ../chrome/content.js
# rm -f ../chrome/service-worker2.js
rm -f ../firefox/*.js
# rm -f ../firefox/content.js
# rm -f ../firefox/service-worker2.js

# Copy
cp *.js ../chrome/
cp content.js ../chrome/
cp *.js ../firefox/
cp content.js ../firefox/

# mkdir -p ../firefox/assets
cp *.css ../firefox
cp ../service/onboarding-page.html ../firefox/

echo "Completed!"

