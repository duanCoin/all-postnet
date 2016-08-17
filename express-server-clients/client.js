let request = require('request');
let readlineSync = require('readline-sync');

let state = 'start';

function getInput() {
    if (state === 'start') {
        access("http://localhost:3000");
    } else if (state === 'chose') {
        let code = readlineSync.question();
        access({url: "http://localhost:3000/chose", method: 'POST', json: true, body: {'code': code}});
    } else {
        let code = readlineSync.question().trim();
        access({url: "http://localhost:3000/translate", method: 'POST', json: true, body: {'code': code}});
    }
}

function access(option) {
    request(option, function (error, response, body) {
        changeState(body);
        console.log(body);
        getInput();
    });
}

function changeState(body) {
    if(state === 'start'){
        state = 'chose';
    }else if(state === 'chose'){
        if(body !== 'Please give right input:') {
            state = 'change';
        }
    }else if(state === 'change'){
        if(body !== 'Please give right input:') {
            state = 'start';
        }
    }
}

getInput();


