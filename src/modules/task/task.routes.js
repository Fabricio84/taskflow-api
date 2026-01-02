import express from 'express'
import authMiddleware from '../../middlewares/auth.middleware.js'
import { index, show, store, update, destroy } from './task.controller.js'

const router = express.Router()

router.post('/tasks', authMiddleware, store)
router.get('/tasks', authMiddleware, index)
router.get('/tasks/:id', authMiddleware, show)
router.put('/tasks/:id', authMiddleware, update)
router.delete('/tasks/:id', authMiddleware, destroy)

export default router
