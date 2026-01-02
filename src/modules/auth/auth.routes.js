import express from 'express'
import authMiddleware from '../../middlewares/auth.middleware.js'
import { register, login } from './auth.controller.js'

const router = express.Router()

// define the home page route
router.post('/auth/register', register)

// define the about route
router.post('/auth/login', login)

export default router
