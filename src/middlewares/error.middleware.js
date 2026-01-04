// src/middlewares/error.middleware.js
import { AppError } from "../errors/AppError.js";

export function errorMiddleware(err, req, res, next) {
  // ✅ Erros do domínio (que você lançou)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { code: err.code, message: err.message },
    });
  }

  // ✅ JWT inválido/expirado
  if (err?.name === "JsonWebTokenError" || err?.name === "TokenExpiredError") {
    return res.status(401).json({
      error: { code: "UNAUTHORIZED", message: "Invalid or expired token" },
    });
  }

  // ✅ Prisma: violação de unicidade (ex: email)
  if (err?.code === "P2002") {
    return res.status(409).json({
      error: { code: "CONFLICT", message: "Resource already exists" },
    });
  }

  // ✅ Prisma: registro não encontrado em update/delete
  if (err?.code === "P2025") {
    return res.status(404).json({
      error: { code: "NOT_FOUND", message: "Resource not found" },
    });
  }

  // ✅ Prisma: enum/date inválido etc. (validação)
  if (err?.name === "PrismaClientValidationError") {
    return res.status(400).json({
      error: { code: "BAD_REQUEST", message: "Invalid request data" },
    });
  }

  console.error(err);
  return res.status(500).json({
    error: { code: "INTERNAL_SERVER_ERROR", message: "Unexpected error" },
  });
}
