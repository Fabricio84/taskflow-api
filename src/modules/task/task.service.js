import { prisma } from "../../config/prisma.js";

const createTask = async (userId, title, description) => {};
const getTasks = async (userId) => {};
const getTaskById = async (userId, taskId) => {};
const updateTask = async (userId, taskId, title, description) => {};
const deleteTask = async (userId, taskId) => {};

export default { createTask, getTasks, getTaskById, updateTask, deleteTask }