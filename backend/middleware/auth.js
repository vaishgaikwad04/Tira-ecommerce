import jwt from 'jsonwebtoken';

export const auth = (requiredRoles = []) => {
  return (req, res, next) => {
    const { token } = req.cookies;

    try {
      if (!token) {
        return res.status(401).json({ message: 'Token not found. Unauthorized' });
      }

      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = {
        userId: decoded.userId,
        role: decoded.role,
      } 

      // Role check
      if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Insufficient role' });
      }

      next(); // Proceed if role is valid
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized: Invalid or expired token', error: error.message });
    }
  };
};


