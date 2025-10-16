// middleware/authMiddleware.js
import userService from "../services/userServices.js";
import paymentService from "../services/paymentServices.js"; // <-- added

// Get user identifier (IP address or X-Forwarded-For or header fallback).
// This is used to identify users for free/paid tracking. Consider using a cookie or auth
// identifier instead of IP in production.
// export const getUserIdentifier = (req) => {
//   return (
//     // prefer an explicit header if frontend sets it, then x-forwarded-for, then express IP fallbacks
//     req.headers["x-user-id"] ||
//     req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//     req.ip ||
//     req.connection?.remoteAddress ||
//     req.socket?.remoteAddress ||
//     "unknown-user"
//   );
// };

// Check if user can convert (has free trial or is paid).
// If not allowed, responds with 402 + pricing details.
// middleware/checkConversionLimit.js
import ExpressError from "../utils/ExpressError.js";

export const checkConversionLimit = (req, res, next) => {
  const user = req.user;

  // Active paid subscription
  if (
    user.subscription.plan !== "free" &&
    new Date(user.subscription.endDate) > new Date()
  ) {
    if (user.subscription.pagesUsed < user.subscription.pageLimit) {
      return next();
    }
    throw new ExpressError("Your subscription page limit is reached", 402);
  }

  // Free trial
  if (user.freePagesUsed < user.freeLimit) {
    return next();
  }

  throw new ExpressError("Free trial ended. Please subscribe to continue", 402);
};
