import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from '../../shared/middlewares';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: number;
 
}
interface IFilter{
    filter?: string;

}

export const GetAllValidator = validation((getSchema)=> ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().notRequired().min(3).moreThan(0),
        limit: yup.number().notRequiredrequired().min(3).moreThan(0),
        filter: yup.string().required().min(3),
    })),
}));

 


export const GetAll = async (req: Request<{}, {},{}, IQueryProps>, res: Response) => {
    return res.send(`chegou ao Get all!`);
};
