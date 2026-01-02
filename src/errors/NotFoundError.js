// src/errors/NotFoundError.js
import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(message = "Not found error") {
    super(message, 404, "NOT_FOUND");
  }
}
