const { ValidationError } = require('sequelize')

function logErrors (error, request, response, next) {
  console.log('Log errors');
  console.error(error);
  next(error);
}

function errorHandler (error, request, response, next) {
  console.log('Error handler');
  response.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}

function boomErrorHandler (error, request, response, next) {
  if (error.isBoom) {
    const { output } = error;
    response.status(output.statusCode).json(output.payload);
  }
  next(error);
}

function ormErrorHandle(error, request, response, next) {
  if (error instanceof ValidationError) {
    response.status(409).json({
      statusCode: 409,
      message: error.name,
      errors:error.errors,
    })
  }
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandle,
};
