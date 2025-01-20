import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from '../../shared/middlewares';


interface IParamProps {
    id?: number;
}
 
export const GetByIdValidation = validation((getSchema)=> ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().Required().moreThan(0),
         
    })),
}));

export const GetById = async (req: Request<IParamProps>, res: Response) => {
    console.log(req.params);
    return res.send(`Get by id`);
};
