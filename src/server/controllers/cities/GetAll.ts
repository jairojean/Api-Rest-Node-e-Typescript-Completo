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


}));

 


export const GetAll = async (req: Request<{}, {},{}, IQueryProps>, res: Response) => {
    return res.send(`chegou ao Get all!`);
};
