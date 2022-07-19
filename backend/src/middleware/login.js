require('dotenv/config')
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// dica para o front : No  header crie o campo Authorization e coloque para receber Bearer token
// Método para verificar se o usuário está autenticado para entrar na rota seguinte
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: ['Unauthenticated!'] });
        }
        const decode = jwt.verify(token, process.env.TOKEN_KEY)
        const user = await User.findOne(
            {
                where: { id: decode.id, fullName: decode.fullName, email: decode.email }
            });

        if (!user) {
            return res.status(401).json({ message: ['Invalid user!'] });
        }
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: ['Token inválido ou expirado!'] });
    }
}