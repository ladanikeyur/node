import jwt from 'jsonwebtoken'

const tokenVarify = async (req, res, next) => {
    const { token } = req.headers
    if (token) {
        const verifyToken = await jwt.verify(token, process.env.JWT_KEY)
        if (verifyToken) {
            next();
        } else {
            res.status(401).send({ status: "fail", message: "unAuthorized access" })
        }
    }else{
        res.status(401).send({ status: "fail", message: "invalide token" })
    }
}


export default tokenVarify