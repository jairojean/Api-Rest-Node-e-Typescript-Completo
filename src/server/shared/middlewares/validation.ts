import { RequestHandler } from 'express';
import { ObjectSchema, ValidationError } from 'yup';

type TProperty = 'body' | 'params' | 'query';
type TALLSchemas = Record<TProperty, ObjectSchema<any>>;
type tValidation = (schemas: Partial<TALLSchemas>) => RequestHandler;

export const validation: tValidation = (schemas) => async (req, res, next) => {
    const errorsResult: Record<string, Record<string, string>> = {};

    await Promise.all(
        Object.entries(schemas).map(async ([key, schema]) => {
            try {
                await schema.validate(req[key as TProperty], { abortEarly: false });
            } catch (err) {
                const yupError = err as ValidationError;
                const errors: Record<string, string> = {};

                if (yupError.inner && Array.isArray(yupError.inner)) {
                    yupError.inner.forEach((error) => {
                        if (error.path === undefined) return;
                        errors[error.path] = error.message;
                    });
                } else if (yupError.path) {
                    errors[yupError.path] = yupError.message;
                }

                errorsResult[key] = errors;
            }
        })
    );
    if (Object.keys(errorsResult).length === 0) {
        return next(); // Chamando o próximo middleware
    } else {
        // Em caso de erro, retorna a resposta de erro
        res.status(400).json({ errors: errorsResult });
    }
    
};
