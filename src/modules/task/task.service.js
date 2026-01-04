import { prisma } from "../../config/prisma.js";

import { NotFoundError } from "../../errors/NotFoundError.js";
import { ForbiddenError } from "../../errors/ForbiddenError.js";
import { ConflictError } from "../../errors/ConflictError.js";

const createTask = async (userId, titulo, descricao, prioridade, dataLimite) => {
    const newTask = await prisma.task.create({
        data: {
            userId,
            titulo,
            descricao,
            prioridade,
            dataLimite
        }
    });

    return newTask;
};
const getTasks = async (userId) => {
    const tasks = await prisma.task.findMany({
        where: {
            userId, ativo: true
        }
    });

    return tasks;
};
const getTaskById = async (userId, taskId) => {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId, ativo: true
        }
    });

    if (!task)
        throw new NotFoundError('Task not found');

    if (task.userId !== userId)
        throw new ForbiddenError('You do not have permission to access this task');

    return task;
};
const updateTask = async (userId, taskId, data) => {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId, ativo: true
        }
    });

    if (!task)
        throw new NotFoundError('Task not found');

    if (task.userId !== userId)
        throw new ForbiddenError('You do not have permission to access this task');

    // regra de negócio
    if (task.status === "CONCLUIDA") {
        throw new ConflictError("Completed tasks cannot be updated");
    }

    return await prisma.task.update({
        where: { id: taskId },
        data: { ...data }
    })
};
const deleteTask = async (userId, taskId) => {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    });

    if (!task)
        throw new NotFoundError('Task not found');

    // 🔐 ownership validation
    if (task.userId !== userId) {
        throw new ForbiddenError("You do not own this task");
    }

    // regra de negócio
    if (task.status === "CONCLUIDA") {
        throw new ConflictError("Completed tasks cannot be updated");
    }

    // soft delete
    return await prisma.task.update({
        where: { id: taskId },
        data: {
            ativo: false
        }
    })
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask }