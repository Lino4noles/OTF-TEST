export type TestEnv = 'PROD' | 'SIT' | 'UAT';

interface EnvConfig {
  BASE_URL: string;
}

const ENV_MAP: Record<TestEnv, EnvConfig> = {
  PROD: { BASE_URL: 'https://www.orangetheory.com' },
  SIT: { BASE_URL: 'https://sit.orangetheory.com' },
  UAT: { BASE_URL: 'https://uat.orangetheory.com' },
};

export function getBaseUrl(): string {
  const rawEnv = process.argv.find(arg => arg.startsWith('@'))?.replace('@', '').toUpperCase() as TestEnv;

  const env: TestEnv = (rawEnv && ENV_MAP[rawEnv]) ? rawEnv : 'SIT'; // default SIT
  return ENV_MAP[env].BASE_URL;
}