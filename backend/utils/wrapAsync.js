// This helper converts an async route handler into one that forwards errors to Express' error middleware
const wrapAsync = (fnx) => {
  return (req, res, next) => {
    Promise.resolve(fnx(req, res, next)).catch(next);
  };
};
export default wrapAsync;
