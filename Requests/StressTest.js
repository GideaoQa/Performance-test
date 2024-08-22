import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

//Validações
//requisições com sucesso > 95%
//requisições com falha < 1%
//duração da requisição tem que ser menor que 500 ms em 95%

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '5s', target: 5 },
        { duration: '2s', target: 50 },
        { duration: '2s', target: 50 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01'],
    }
}

const csvData = new SharedArray('Ler Dados', function(){
    return papaparse.parse(open('../Data/usuario.csv'), {header: true}).data;
}); 

export default function () {
    const BASE_URL = `https://test-api.k6.io`;
    const USER = csvData[Math.floor(Math.random() * csvData.length)].usuario
    const PASS = 'user123'

    console.log( USER )
    
    const response = http.get(`${BASE_URL}/auth/token/login/`,{
        username: USER,
        passWord: PASS
    });

    check(response, {
        'sucesso ao registrar': (r) => r.status === 200,
        'token gerado': (r) => r.json('acess') !== ''
 
    });

    sleep(1)
}