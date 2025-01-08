import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from '../../shared/middlewares';

interface ICity {
  name: string;
  state: string;
}
interface IFilter{
    filter?: string;

}

export const createBodyValidator = validation({
    body: yup.object().shape({
        name: yup.string().required().min(2),
        state: yup.string().required().min(2),
      }),
      query: yup.object().shape({
        filter: yup.string().required().min(2)
}),
});


export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
    return res.send(`A cidade  foi salva com sucesso!`);
};
