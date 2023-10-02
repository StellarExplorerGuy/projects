#!/bin/bash

echo "Starting the installation..."
cd service && npm ci
cd ../
cd react-app && npm ci

echo "Done!"

