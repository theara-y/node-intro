const fs = require('fs')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    });
}

function webCat(url) {
    axios.get(url)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(`Request failed with ${err}`)
        })
}

let flag = process.argv[2]
let url = process.argv[3]


if(flag == undefined || url == undefined) {
    console.log('$ node step2.js -f fileurl');
    console.log('$ node step2.js -w weburl');
    process.exit(1);
}

if(flag == '-f') {
    cat(url)
} else if(flag == '-w') {
    webCat(url)
} else {
    console.log('Invalid flag')
    console.log('$ node step2.js -f fileurl');
    console.log('$ node step2.js -w weburl');
    process.exit(1);
}