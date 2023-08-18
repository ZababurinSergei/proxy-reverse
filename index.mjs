import path from 'path';
import process from 'process';
import cors from 'cors';
import Enqueue from 'express-enqueue';
import compression from 'compression';
import proxy from 'express-http-proxy';
import * as dotenv from 'dotenv';
import express from 'express';

let __dirname = process.cwd();
dotenv.config();
export const modules = async (app) => {
    let whitelist = [];

    app.use(compression());
    app.use(express.json());

    const queue = new Enqueue({
        concurrentWorkers: 4,
        maxSize: 200,
        timeout: 30000
    });

    console.log('__dirname', __dirname);

    app.use(await cors({ credentials: true }));
    app.use(queue.getMiddleware());

    app.use((req, res, next) => {
        console.log(`node: 'proxy reverse': ${req.method}: ${req.path}`);
        next();
    });

    app.use(proxy('https://main--tangerine-haupia-516bdf.netlify.app', {
        limit: '5mb',
        filter: function (req) {
            const data = ['/api'].some(path => req.path.startsWith(path));
            return data;
        }
    }));

    app.use(express.static(`${__dirname}/docs`));


    app.get(`/*`, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '/docs/index.html'));
    });

    app.use(queue.getErrorMiddleware());

    return app
};

export default {
    description: 'server welcomebook'
};