const baseColor = '#b8b5b6';

const skyPalette = {
  '50': '#e1f5fe',
  '100': '#b3e5fc',
  '200': '#81d4fa',
  '300': '#4fc3f7',
  '400': '#29b6f6',
  '500': '#03a9f4',
  '600': '#039be5',
  '700': '#0288d1',
  '800': '#0277bd',
  '900': '#01579b',
};

// Function to generate shades based on the base color and palette
function generateColorScheme(baseColor, palette) {
  const colorScheme = {};
  for (const shade in palette) {
    const color = palette[shade];
    const newColor = blendColors(baseColor, color);
    colorScheme[shade] = newColor;
  }
  return colorScheme;
}

// Function to blend colors based on the base color and the palette color
function blendColors(baseColor, paletteColor) {
  const ratio = 0.5; // You can adjust this ratio for different shades
  const hex = (c) => parseInt(c, 16);
  const r = Math.round(hex(baseColor.slice(1, 3)) * (1 - ratio) + hex(paletteColor.slice(1, 3)) * ratio);
  const g = Math.round(hex(baseColor.slice(3, 5)) * (1 - ratio) + hex(paletteColor.slice(3, 5)) * ratio);
  const b = Math.round(hex(baseColor.slice(5, 7)) * (1 - ratio) + hex(paletteColor.slice(5, 7)) * ratio);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

const backgroundScheme = generateColorScheme(baseColor, skyPalette);
console.log(backgroundScheme);