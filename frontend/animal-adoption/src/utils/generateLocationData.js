// generateLocationData.js
const fs = require('fs');

import { countryDataArray } from './countryData';
const countryMapEntries = countryDataArray
  .map(
    (item) =>
      `["${item.country}", [${item.cities.map((city) => `"${city}"`).join(', ')}]]`
  )
  .join(',\n');

const countries = countryDataArray.map((item) => `"${item.country}"`).join(', ');

const fileContent = `
  export const countryMap = new Map<string, string[]>([
    ${countryMapEntries}
  ]);

  export const countriesSet = new Set<string>([
    ${countries}
  ]);
`;

fs.writeFileSync('locationData.ts', fileContent);