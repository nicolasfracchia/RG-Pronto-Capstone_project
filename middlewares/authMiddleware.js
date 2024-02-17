const jwt = require('jsonwebtoken');
const UserController = require('../controllers/UserController');

function verifyToken(requiredRole) {
    if(!requiredRole || isNaN(requiredRole)){
        return res.status(500).json('Error fetching required permissions');
    }
    return async (req, res, next) => {
        let token = req.header('Authorization')
        
        if(token){
            token = token.replace('Bearer ', '');
        }else{
            return res.status(401).json('Access denied');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            const user = await UserController.getUserById(decoded.userId);
            
            if(!user || !decoded){
                return res.status(500).json('Error fetching the user');
            }else{
                if(user.UserType.id <= requiredRole){
                    next();
                }else{
                    return res.status(401).json('Access denied');
                }
            }
        } catch (error) {
            res.status(401).json('Invalid token');
        }
    }
};

module.exports = verifyToken;