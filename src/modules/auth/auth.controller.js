import authService from './auth.service.js'

export async function register(req, res, next) {
    try {
        const { email, senha, nome } = req.body

        if (!email || !senha)
            throw new BadRequestError("Email and senha are required");

        if (senha.length < 6)
            throw new BadRequestError(
                "Senha must be at least 6 characters long"
            );


        const user = await authService.register(email, senha, nome)

        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

export async function login(req, res, next) {
    try {
        const { email, senha } = req.body

        if (!email || !senha)
            throw new BadRequestError("Email and senha are required");

        const token = await authService.login(email, senha)
        res.status(200).json({ token })
    } catch (error) {
        next(error)
    }
}
