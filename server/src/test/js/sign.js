const crypto = require('crypto');
const fetch = require("isomorphic-unfetch");
const salt = 'AAB67E29-E6E9-47A9-A5C5-2DC2652F5F60';

function md5 (value) {
    console.log(value+salt);
    return crypto.createHash('md5').update(value+salt,'utf8').digest('hex')
}

console.log(md5('a'));

const student = {
    BName: '201730126030',
    Bdistance: '1.4',
    BMac: 'A0-C5-89-E3-75-FF'
};

const data = {
    AppID: 2,
    time: Date.now(),
    devices: [
        student
    ],
    type: 'test'
};


const req = {
    data,
    md5: md5(JSON.stringify(data))
};

console.log(JSON.stringify(req));

console.log(JSON.stringify(data));

fetch('http://39.104.110.210:8443/student/sign-in-all',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then(res => res.json())
    .then(res => {
        console.log(res)
    });
