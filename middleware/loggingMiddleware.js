const morgan = require('morgan');
const morganFormat = morgan('dev');

const loggingMiddleware = (req, res, next) => {
    
    morganFormat(req, res, () => {
        const timestamp = new Date().toISOString();
        const method = req.method;
        const route = req.originalUrl;

        console.log('\n=============================');
        console.log(`[${timestamp}] ${method} request to ${route}`);
        console.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`);

        if (req.body && Object.keys(req.body).length > 0) {
            console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
        } else {
            console.log('END');
        }

        console.log('=============================\n');

        next();
    });
};

module.exports = loggingMiddleware;
