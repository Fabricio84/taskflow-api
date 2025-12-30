// src/errors/UnauthorizedError.js
import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400, "BAD_REQUEST");
  }
}
