import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from '../../shared/middlewares';


interface IParamProps {
    id?: number;
}

interface IBodyProps {
    name?: String;
}
 
export const UpdateByIdValidation = validation((getSchema)=> ({
    params: getSchema<IParamProps>(yup.object().shape({
        name: yup.string().Required().min(3),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
         id: yup.number().integer().Required().moreThan(0),
    })),
}));

export const UpdateById = async (req: Request<IParamProps>, res: Response) => {
    console.log(req.params);
    return res.send(`Get by id`);
};

 