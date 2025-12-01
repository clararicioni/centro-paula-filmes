import { writeFileSync } from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const apiKey = process.env['NG_APP_API_KEY'];

if (!apiKey) {
  throw new Error('NG_APP_API_KEY não definida. Configure na Vercel.');
}

const envFileContent = `
export const environment = {
  production: true,
  apiKey: "${apiKey}"
};
`;

writeFileSync(targetPath, envFileContent);
console.log('✅ environment.prod.ts gerado com sucesso!');
