#!/bin/bash

echo "build service-worker"
cd service && npm run build

cd ..

echo "build react-app-modal"
cd react-app && npm run build

