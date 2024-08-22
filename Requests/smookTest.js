import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '30s',
    //valida que a taxa de sucesso das requisições seja maior que 99%
    thresholds: {
        checks: ['rate > 0.99']
    }
}

export default function () {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';
    
    const response = http.get(BASE_URL);

    check(response, {
        'status code é 200': (r) => r.status === 200
    });
}