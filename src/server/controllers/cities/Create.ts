import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";

interface ICity {
  name: string;
  state: string;
}

const bodyValidation: yup.ObjectSchema<ICity> = yup.object().shape({
  name: yup.string().required().min(2),
  state: yup.string().required().min(2),
});

export const createbodyValidator: RequestHandler = async(req, res, next) => {
    try {
         await bodyValidation.validate(req.body, { abortEarly: false });
         return next();
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const validationErrors: Record<string, string> = {};
    
          error.inner.forEach((err) => {
            if (err.path) {
              validationErrors[err.path] = err.message;
            }
          });
    
          return res.status(400).json({ errors: validationErrors });
        }
    }
    
};


export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
    return res.send(`A cidade  foi salva com sucesso!`);
};
