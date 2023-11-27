// Create web server
// 1. create a server
// 2. start the server
// 3. handle request and response
// 4. listen to a port

// 1. create a server
const http = require('http');
const fs = require('fs');
const url = require('url');
const queryString = require('querystring');

const server = http.createServer((req, res) => {
    // 3. handle request and response
    const pathName = url.parse(req.url).pathname;
    const method = req.method;
    // console.log('pathName', pathName);
    // console.log('method', method);

    if (pathName === '/') {
        // show the form
        res.writeHead(200, { 'Content-type': 'text/html' });
        fs.readFile('./public/index.html', 'utf-8', (err, data) => {
            if (err) {
                console.log('err', err);
            }
            res.end(data);
        });
    } else if (pathName === '/comments' && method === 'GET') {
        // show the comments
        fs.readFile('./public/comments.json', 'utf-8', (err, data) => {
            if (err) {
                console.log('err', err);
            }
            res.end(data);
        });
    } else if (pathName === '/comments' && method === 'POST') {
        // add a new comment
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            // console.log('body', body);
            const comment = queryString.parse(body);
            // console.log('comment', comment);
            fs.readFile('./public/comments.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log('err', err);
                }
                const comments = JSON.parse(data);
                comments.push(comment);
                fs.writeFile(
                    './public/comments.json',
                    JSON.stringify(comments),
                    (err) => {
                        if (err) {
                            console.log('err', err);
                        }
                        res.end(JSON.stringify(comments));
                    }
                );
            });
        });
    } else {
        // show 404
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');