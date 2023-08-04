import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(403).send({message: 'No token provided.'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({message: 'Failed to authenticate token.'});
        }
        // Si el token es válido, añade el payload decodificado a req.user
        req.user = decoded;
        next();
    });
};

export default authenticateJWT;
