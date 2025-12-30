// src/errors/AppError.js
export class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code; // string tipo: "BAD_REQUEST"
    this.isOperational = true; // útil para diferenciar erro esperado vs bug
  }
}
