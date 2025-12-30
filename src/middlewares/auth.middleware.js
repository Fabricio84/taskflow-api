export default (req, res, next) => {
    // Simple authentication middleware example
    console.log('Auth middleware executed')

    next()
}