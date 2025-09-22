import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import yaml from 'js-yaml';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const { BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, GEO_LOCATION } = process.env;

if (!BROWSERSTACK_USERNAME || !BROWSERSTACK_ACCESS_KEY) {
  console.error('❌ Missing BrowserStack credentials in .env!');
  process.exit(1);
}

const NODE_ENV = process.argv[2]?.replace('@', '').toUpperCase() || 'SIT';

const ENV_MAP: Record<string, { GEO_LOCATION: string; BASE_URL: string }> = {
  PROD: { GEO_LOCATION: 'US-CA', BASE_URL: 'https://prod.orangetheory.com' },
  SIT: { GEO_LOCATION: 'US-WA', BASE_URL: 'https://sit.orangetheory.com' },
  UAT: { GEO_LOCATION: 'US-CT', BASE_URL: 'https://uat.orangetheory.com' },
};

const envConfig = ENV_MAP[NODE_ENV] || ENV_MAP['SIT'];

const yamlPath = path.resolve(__dirname, '../browserstack.yml');
const fileContents = fs.readFileSync(yamlPath, 'utf8');
const yamlData = yaml.load(fileContents) as any;

yamlData.userName = BROWSERSTACK_USERNAME;
yamlData.accessKey = BROWSERSTACK_ACCESS_KEY;

yamlData.buildName = `OTF-TEST-${NODE_ENV}`;

function getFormattedBuildIdentifier(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  };

  const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
  const parts = formatted.split(', '); // ["MM/DD/YYYY", "HH:MM AM/PM"]
  const datePart = parts[0].replace(/\//g, '-');
  const timePart = parts[1];

  return `${datePart}/${timePart} EST`;
}

yamlData.buildIdentifier = getFormattedBuildIdentifier();

const finalGeo = GEO_LOCATION || envConfig.GEO_LOCATION;

if (!Array.isArray(yamlData.platforms)) {
  console.error('❌ platforms is not an array in browserstack.yml');
  process.exit(1);
}

yamlData.platforms.forEach((platform: any) => {
  platform.geoLocation = finalGeo;
});

fs.writeFileSync(
  yamlPath,
  yaml.dump(yamlData, { quotingType: '"', forceQuotes: true }),
  'utf8'
);

console.log('✅ browserstack.yml updated successfully!');
console.log(`Environment: ${NODE_ENV}`);
console.log(`GeoLocation: ${finalGeo}`);
console.log(`BuildName: ${yamlData.buildName}`);
console.log(`BuildIdentifier: ${yamlData.buildIdentifier}`);