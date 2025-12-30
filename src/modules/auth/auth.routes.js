import express from 'express'
import authMiddleware from '../../middlewares/auth.middleware.js'
import { register, login } from './auth.controller.js'

const router = express.Router()

// define the home page route
router.post('/register', register)

// define the about route
router.post('/login', login)

export default router
