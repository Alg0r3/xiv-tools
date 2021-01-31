import http from 'http';
import path from 'path';
import fs from 'fs';

import mimeTypes from './mime-types.js';

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 5000;

// On each client request, returns a callback func
const server = http.createServer((req, res) => {
    console.log(`Request: ${req.url}`);

    let filePath = `.${req.url}`
    if (filePath === './') filePath = './index.html';
    
    const extension = path.extname(filePath).toLocaleLowerCase();
    const contentType = mimeTypes[extension] || 'application/octet-stream';

    res.writeHead(200, {'Content-type': contentType});

    fs.readFile(filePath, (err, data) => {
        err ? console.log(err.message) : res.write(data);
        res.end();
    });
});

server.listen(port, hostname, err => {
    err ? console.log(err.message) : console.log(`Server listening on port: ${port}`);
});