import fs from 'fs';
import https from 'https';
import path from 'path';
import app from './app.js';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
});