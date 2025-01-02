import { RequestHandler } from 'express';
import { SchemaOf, ValidationError } from 'yup';


type TProperty= 'body'|'params'|'query';
type TALLSchemas = Record<TProperty, SchemaOf<any>>;
type tValidation = (schemas: Partial<TALLSchemas>) => RequestHandler;




export const validation: tValidation = (schemas) => async (req, res, next) => {

  try {
    await schema.validate(req[field], { abortEarly: false }); // Corrigido: apenas schema.validate
    return next();
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

    return res.status(400).json({ errors });
  }
};
