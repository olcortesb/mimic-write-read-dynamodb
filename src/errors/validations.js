const { ApplicationError } = require('./aplications');

class ValidationError extends ApplicationError {
  constructor(name, message, statusCode, stack) {
    super();
    this.name = name ?? 'ValidationError';
    this.message = message ?? 'Validation failed.';
    this.statusCode = statusCode ?? 400;
    this.stack = stack;
    Error.captureStackTrace(this, ValidationError);
  }
}

module.exports = { ValidationError };