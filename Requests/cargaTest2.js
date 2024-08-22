import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';  

//Validações
//requisições com sucesso > 95%
//requisições com falha < 1%
//duração da requisição tem que ser menor que 500 ms em 95%

export const options = {
    stages: [
        { duration: '10s', target: 10 },
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    }
}

export default function () {
    const BASE_URL = `https://test-api.k6.io`;
    const USER = `${Math.random()}@mail.com`
    const PASS = 'user123'

    console.log( USER + PASS )
    
    const response = http.get(`${BASE_URL}/user/register/`,{
        username: USER,
        first_name: 'Teste',
        last_name: 'crocodilo',
        email: USER,
        passWord: PASS
    });

    check(response, {
        'sucesso ao registrar': (r) => r.status === 201
    });

    sleep(1)
}