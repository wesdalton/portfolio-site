const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'public', 'images', 'headshot.jpeg');
const outputDir = path.join(__dirname, 'public');

// Create favicon sizes
async function generateFavicons() {
  try {
    // Create favicon.ico (16x16)
    await sharp(inputFile)
      .resize(16, 16)
      .toFile(path.join(outputDir, 'favicon-16x16.png'));
    
    // Create favicon-32x32.png
    await sharp(inputFile)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    
    // Create apple-touch-icon.png (180x180)
    await sharp(inputFile)
      .resize(180, 180)
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    // Create favicon.ico from the 16x16 png
    await sharp(path.join(outputDir, 'favicon-16x16.png'))
      .toFile(path.join(outputDir, 'favicon.ico'));

    console.log('Favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();