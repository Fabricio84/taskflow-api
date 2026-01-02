import { prisma } from "../../config/prisma.js";

const createTask = async (userId, titulo, decricao, prioridade, dataLimite) => {};
const getTasks = async (userId) => {};
const getTaskById = async (userId, taskId) => {};
const updateTask = async (userId, taskId, titulo, descricao, prioridade, dataLimite, status) => {};
const deleteTask = async (userId, taskId) => {};

export default { createTask, getTasks, getTaskById, updateTask, deleteTask }