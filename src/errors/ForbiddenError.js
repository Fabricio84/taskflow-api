// src/errors/ForbiddenError.js
import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden error") {
    super(message, 403, "FORBIDDEN");
  }
}
