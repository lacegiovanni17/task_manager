import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';


function validationMiddleware(schema: Joi.Schema, target: 'body' | 'query' | 'params' = 'body'): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        }

        try {
            const validatedData = await schema.validateAsync(req[target], validationOptions);
            req[target] = validatedData;
            next();
        } catch (error: any) {
            const errors = error.details.map((err: Joi.ValidationErrorItem) => err.message);
            res.status(422).json({
                status: false,
                message: 'Validation failed',
                errors: errors
            });
        }
    }
}

export default validationMiddleware;