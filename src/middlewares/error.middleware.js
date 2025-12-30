// src/middlewares/error.middleware.js
import { AppError } from "../errors/AppError.js";

export function errorMiddleware(err, req, res, next) {
  // Erros conhecidos (operacionais)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  // Erro inesperado (bug)
  console.error(err);
  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Unexpected error",
    },
  });
}
