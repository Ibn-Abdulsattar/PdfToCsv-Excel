// This custom error adds a consistent HTTP statusCode property used by the error handler
export default class ExpressError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode; // <-- align with error middleware
    Error.captureStackTrace?.(this, this.constructor);
  }
}
