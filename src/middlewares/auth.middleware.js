import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

export default function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Token not provided");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // padrão profissional
    req.user = {
      id: decoded.sub || decoded.userId
    };

    return next();
  } catch {
    throw new UnauthorizedError("Invalid token");
  }
}
