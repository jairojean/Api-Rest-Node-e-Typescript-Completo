import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from '../../shared/middlewares';

interface ICity {
 
}
interface IFilter{
    filter?: string;

}

export const createBodyValidator = validation({
    body: yup.object().shape({
        name: yup.string().required().min(2),
      }),
      
});


export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
    try {
        // Aqui você pode adicionar a lógica para salvar a cidade (banco de dados, etc)
        console.log(`Cidade criada: `);

        // Envia a resposta de sucesso
        res.status(201).send(`A cidade  foi salva com sucesso!`);
    } catch (error) {
        // Caso ocorra um erro, envia uma resposta de erro
        res.status(500).send("Erro ao criar a cidade.");
    }
};
