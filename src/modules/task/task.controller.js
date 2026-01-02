import { getTasks, getTaskById, createTask, updateTaskById, deleteTask } from './task.service.js';
import { BadRequestError } from '../../errors/BadRequestError.js';                                                                                                                                                                                                                                                                                                      

export async function index(req, res, next) {
    try {
        const userId = req.user.id;
        
        if (!userId)
            throw new BadRequestError('User ID é orbigatório!');
        
        const tasks = await getTasks(userId);

        res.status(200).json(tasks);
    } catch (error) {
        next(error)
    }
}

export async function show(req, res, next) {
    try {
        const userId = req.user.id;
        const { taskId } = req.query
 
        if (!userId)
            throw new BadRequestError('User ID é orbigatório!');

        if (!taskId)
            throw new BadRequestError('Task ID é orbigatório!');

        const task = await getTaskById(userId, taskId);

        res.status(200).json(task);
    } catch (error) {
        next(error)
    }
}

export async function store(req, res, next) {
    try {
        const userId = req.user.id;
        const { titulo, descricao, prioridade, dataLimite } = req.body;
        
        if (!userId)
            throw new BadRequestError('User ID é orbigatório!');

        if (!titulo)
            throw new BadRequestError('Título é orbigatório!');

        if (!descricao)     
            throw new BadRequestError('Descrição é orbigatório!');

        if (!prioridade)     
            throw new BadRequestError('Prioridade é orbigatório!');

        const newTask = await createTask(userId, titulo, descricao, prioridade, dataLimite);

        res.status(201).json(newTask);    
    } catch (error) {
        next(error)
    }
}

export async function update(req, res, next) {
    try {
        const userId = req.user.id;
        const { taskId, titulo, descricao, prioridade, dataLimite, status} = req.body;
        
        if (!userId)
            throw new BadRequestError('User ID é orbigatório!');

        if (!taskId)
            throw new BadRequestError('Task ID é orbigatório!');

        const updatedTask = await updateTaskById(userId, taskId, titulo, descricao, prioridade, dataLimite, status);

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error)
    }
}

export async function destroy(req, res, next) {
    try {
        const userId = req.user.id;
        const { taskId } = req.body;
        
        if (!userId)
            throw new BadRequestError('User ID é orbigatório!');

        if (!taskId)
            throw new BadRequestError('Task ID é orbigatório!');
        
        await deleteTask(userId, taskId);

        res.status(204).send();
    } catch (error) {
        next(error)
    }
}

