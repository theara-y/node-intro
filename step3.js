const fs = require('fs')
const axios = require('axios')

function cat(path, out) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            process.exit(1);
        }

        if(out != undefined) {
            writeFile(out, data)
        } else {
            console.log(data);
        }
    });
}

function webCat(url, out) {
    axios.get(url)
        .then(res => {
            if(out != undefined) {
                writeFile(out, res.data)
            } else {
                console.log(res.data)
            }
        })
        .catch(err => {
            console.log(`Request failed with ${err}`)
        })
}

function writeFile(url, data) {
    fs.writeFile(url, data, 'utf-8', (err) => {
        if(err) {
            console.log(err)
            process.exit(1)
        }
        console.log(`Wrote data to ${url}`)
    });
}

let urlFlag = process.argv[2]
let url = process.argv[3]
let outFlag = process.argv[4]
let out = process.argv[5]

if (urlFlag != '-f' && urlFlag != '-w') {
    console.log('urlFlag not valid: -f or -w accepted')
    process.exit(1)
}
if (url == undefined) {
    console.log('url required')
    process.exit(1)
}
if (outFlag != '--out' && outFlag != undefined) {
    console.log('outFlag not valid: only --out accepted')
    process.exit(1)
}
if (outFlag == '--out' && out == undefined) {
    console.log('out file not specified')
    process.exit(1)
}
    
if(urlFlag == '-f') {
    cat(url, out)
} else if(urlFlag == '-w') {
    webCat(url, out)
} else {
    console.log('Error')
    process.exit(1);
}