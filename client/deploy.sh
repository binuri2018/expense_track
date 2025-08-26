#!/bin/bash

# Build the React app
echo "Building React app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful! Ready for Netlify deployment."
    echo ""
    echo "Next steps:"
    echo "1. Go to https://app.netlify.com/"
    echo "2. Click 'New site from Git'"
    echo "3. Connect your GitHub repository"
    echo "4. Set build command: npm run build"
    echo "5. Set publish directory: build"
    echo "6. Deploy!"
else
    echo "Build failed! Please check for errors."
    exit 1
fi
