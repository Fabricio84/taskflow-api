import express from 'express'
import authMiddleware from '../../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/tasks', authMiddleware, (req, res) => {})
router.get('/tasks', authMiddleware, (req, res) => {})
router.get('/tasks/:id', authMiddleware, (req, res) => {})
router.put('/tasks/:id', authMiddleware, (req, res) => {})
router.delete('/tasks/:id', authMiddleware, (req, res) => {})

export default router
