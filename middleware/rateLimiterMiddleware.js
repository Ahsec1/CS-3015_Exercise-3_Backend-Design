const rateLimit = require('express-rate-limit');

const rateLimiterMiddleware = rateLimit({
    windowMs: 1 * 10 * 1000, 
    max: 5, 
    message: {
        error: 'Too many requests. Please try again later'
    },
    headers: true, 
    handler: (req, res, next, options) => {
        res.setHeader('Retry-After', 60); 
        res.status(options.statusCode).send(options.message);
    },
});

module.exports = rateLimiterMiddleware;