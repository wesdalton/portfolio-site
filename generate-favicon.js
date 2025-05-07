const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Use absolute paths
const basePath = '/Users/wesdalton/Desktop/Portfolio Site';
const inputFile = path.join(basePath, 'public', 'images', 'headshot.jpeg');
const outputDir = path.join(basePath, 'public');

// Create favicon sizes
async function generateFavicons() {
  try {
    console.log(`Input file: ${inputFile}`);
    console.log(`Output directory: ${outputDir}`);
    
    // Create favicon-16x16.png
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
    
    // Create favicon.ico
    await sharp(inputFile)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon.ico'));

    console.log('Favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();