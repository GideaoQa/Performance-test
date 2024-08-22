import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';  
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200']
    }
}

const data = new SharedArray('Leitura do json', function(){
    return JSON.parse(open('../Data/dados.json')).crocodilos
})

export default function () {
    const crocodilo = data[Math.floor(Math.random() * data.length)].id
    console.log(crocodilo)
    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`;
    
    const response = http.get(BASE_URL);

    check(response, {
        'status code é 200': (r) => r.status === 200
    });

    sleep(1)
}
export function handleSummary(data) {
    return {
      "Teste.html": htmlReport(data),
    };
  }