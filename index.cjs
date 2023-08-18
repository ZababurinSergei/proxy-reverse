// const { init } = require('./tracing.cjs');
// init('checklist', 'development');

const server = import('./index.mjs');
const express = require('express');
const serverless = require('serverless-http');

const app = express();

try {
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    const data = await server()
    const app = await data.modules(app);

    const port = (process.env.PORT)
        ? process.env.PORT
        : 3764;

    module.exports.handler = serverless(app);


    process.on('SIGINT', function () {
        process.exit(0);
    });

    // app.listen(port, () => {
    //     console.log('pid: ', process.pid);
    //     console.log('listening on http://localhost:' + port);
    // });
} catch (e) {
    console.error('======= ERROR =======', e)
}
