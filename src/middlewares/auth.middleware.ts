import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from "../modules/users/user.model";
import { UserRoles, UserStatus } from '../modules/users/user.enum';

type AuthUser = { user_id: string, email: string, user_role: UserRoles };

interface AuthRequest extends Request {
    user?: AuthUser;
}

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ status: false, message: 'Authentication token is missing' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUser;
        req.user = decoded;

        User.findByIdAndUpdate(decoded.user_id, { user_status: UserStatus.ACTIVE }, { new: true }).exec();

        next();
    } catch (error) {
        res.status(403).json({ success: false, message: 'Forbidden. Token is invalid or expired' });
        return;
    }
}

export const authorizeRoles = (roles: UserRoles | UserRoles[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void | any => {
        if (!req.user) {
            return res.status(403).json({ success: false, message: 'Forbidden. Authentication required' });
        }

        const requiredRoles = Array.isArray(roles) ? roles : [roles];

        if (requiredRoles.includes(req.user.user_role as UserRoles)) {
            return next();
        }

        res.status(403).json({
            success: false,
            message: 'Forbidden. You do not have permission to access this resource',
        });
    }
}