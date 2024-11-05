import countryData from './locationData.json';

interface CountryData {
    country: string;
    cities: string[];
}

// Your JSON data

const countryDataArray: CountryData[] = countryData;

// Convert to a Map
export const countryMap = new Map<string, string[]>();
countryDataArray.forEach((item) => {
    countryMap.set(item.country, item.cities);
});

// Create a Set of country names for quick validation
export const countriesSet = new Set<string>(countryMap.keys());