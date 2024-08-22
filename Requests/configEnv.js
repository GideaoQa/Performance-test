import { readFileSync } from 'fs';
import { env } from 'k6';

// Função para carregar o arquivo .env
function loadEnv() {
    const envFile = readFileSync('../.env', 'utf8');
    const envVars = envFile.split('\n');

    envVars.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim();
        }
    });
}

// Chame a função para carregar o arquivo .env
loadEnv();