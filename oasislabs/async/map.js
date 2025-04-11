'use strict';
const { get } = require('http');
const async = require('async');
const { pipeline } = require('stream');
const concat = require('concat-stream');


async.map([1, 0, 2], (num, done) => {
  const result = 10 / num
  done(result)
}, (err, result) => {
  if (err) console.error(err);
  console.log(result);
})

// async.map(
//   [
//     'http://jsonplaceholder.typicode.com/todos/1',
//     'http://mock.codes/500',
//     'http://jsonplaceholder.typicode.com/todos/3',
//   ],
//   function (url, done) {
//     get(url, (res) => {
//       res.setEncoding('utf-8');
//       pipeline(
//         res,
//         concat((data) => done(null, data)),
//         (err) => {
//           if (err) return done(err);
//         }
//       );
//     }).on('error', done);
//   },
  // function (err, result) {
  //   if (err) console.error(err);
  //   console.log(result);
  // }
// );
