import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma } from "../../config/prisma.js";
import { ConflictError } from '../../errors/ConflictError.js';
import { UnauthorizedError } from '../../errors/UnauthorizedError.js';

const register = async (email, senha, nome) => {
    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (userExists)
        throw new ConflictError("Email already in use");

    const user = await prisma.user.create({
        data: {
            email,
            senha: await bcrypt.hash(senha, 10),
            nome,
        },
    });

    return { id: user.id, nome: user.nome, email: user.email, data_criacao: user.data_criacao };
}

const login = async (email, senha) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return token;
}

export default { register, login }
