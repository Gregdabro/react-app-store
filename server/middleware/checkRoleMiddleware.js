const tokenService = require("../services/token.service");

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.status(401).json({ message: "Unauthorized"})
            }

            const data = tokenService.validateAccess(token)
            if (!data) {
                return res.status(401).json({message: 'Unauthorized'})
            }
            if (data.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }

            req.user = data

            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    };
}