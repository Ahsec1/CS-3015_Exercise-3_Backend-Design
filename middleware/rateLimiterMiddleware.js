const rateLimit = require('express-rate-limit');

const rateLimiterMiddleware = rateLimit({
    windowMs: 1 * 10 * 1000, //10 seconds
    max: 5, //maximum of 5 requests
    message: {
        error: 'Too many requests. Please try again later' //message for number request exceeds limit
    },
    headers: true, 
    // Custom handler for rate limit exceeded
    handler: (req, res, next, options) => {
        res.setHeader('Retry-After', 60); 
        res.status(options.statusCode).send(options.message);
    },
});

module.exports = rateLimiterMiddleware;