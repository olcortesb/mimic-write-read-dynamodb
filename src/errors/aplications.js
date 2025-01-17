class ApplicationError extends Error {
    constructor(name, message, statusCode, stack) {
      super();
      this.name = name ?? 'ApplicationError';
      this.message = message ?? 'An application error occurred.';
      this.statusCode = statusCode ?? 500;
      this.stack = stack;
    }
  }

  module.exports = { ApplicationError };