const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Colors from your theme
const BG_COLOR = '#0a192f'; // dark blue background
const TEXT_COLOR = '#64ffda'; // green/teal text

// Create favicon with WD text
function createTextFavicon(size, text, outputPath) {
  // Create canvas
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, size, size);
  
  // Add text
  ctx.fillStyle = TEXT_COLOR;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Calculate font size (approximately half the canvas size)
  const fontSize = Math.floor(size * 0.5);
  ctx.font = `bold ${fontSize}px sans-serif`;
  
  // Draw text in center
  ctx.fillText(text, size / 2, size / 2 + fontSize * 0.1);
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`Created favicon at ${outputPath}`);
}

// Output directory
const outputDir = path.join(__dirname, 'public');

// Create different sized favicons
createTextFavicon(16, 'W', path.join(outputDir, 'favicon-16x16.png'));
createTextFavicon(32, 'W', path.join(outputDir, 'favicon-32x32.png'));
createTextFavicon(180, 'WD', path.join(outputDir, 'apple-touch-icon.png'));
createTextFavicon(32, 'W', path.join(outputDir, 'favicon.ico'));

console.log('All favicons created successfully!');