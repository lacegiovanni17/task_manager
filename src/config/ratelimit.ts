import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    message: "Too many requests from this IP, please try again later.",
})

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    message: "Too many authentication attempts from this IP, please try again later.",
})

export const taskRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    message: "Too many task requests from this IP, please try again later.",
})

// import rateLimit from 'express-rate-limit';

// export const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Global limit
//   message: "Too many requests from this IP, please try again later"
// });

// export const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5, // Strict limit for auth
//   message: "Too many login attempts, try again later"
// });

// export const bookingLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 25,
//   message: "Too many booking requests"
// });
