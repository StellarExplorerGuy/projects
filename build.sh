#!/bin/bash

echo "build service-worker"
cd service && npm run build

cd ..

echo "build react-app-modal"
cd react-app && npm run build

cd ../extension

rm service-worker2.js
rm content.js.LICENSE.txt