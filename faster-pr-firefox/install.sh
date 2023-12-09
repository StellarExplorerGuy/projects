#!/bin/bash

echo "Starting the installation..."
cd service && npm i
cd ../
cd react-app && npm i

echo "Done!"

