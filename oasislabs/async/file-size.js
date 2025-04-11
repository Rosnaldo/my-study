const async = require('async');
const fs = require('fs');

const fileList = ['url.txt', 'missing-file.txt'];

function getFileSizeInBytes(file, done) {
    fs.stat(file, function(err, stat) {
        if (err) {
            return done(err);
        }
        done(null, stat.size);
    });
}

async.map(fileList, getFileSizeInBytes, function(err, results) {
    if (err) {
        console.log('ERROR!', err);
    } else {
        console.log(results);
    }
});