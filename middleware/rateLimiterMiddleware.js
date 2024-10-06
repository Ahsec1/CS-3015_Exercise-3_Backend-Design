const rateLimit = require('express-rate-limit');

const rateLimiterMiddleware = rateLimit({
    windowMs: 1 * 10 * 1000, // 10 seconds
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many requests. Please try again later',
    },
    headers: true,
});

module.exports = rateLimiterMiddleware;
