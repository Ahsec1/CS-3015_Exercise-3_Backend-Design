const rateLimit = require('express-rate-limit');

const rateLimiterMiddleware = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many requests. Please try again later',
    },
    headers: true,
});

module.exports = rateLimiterMiddleware;
