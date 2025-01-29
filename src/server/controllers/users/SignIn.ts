import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsersProvider } from '../../database/providers/users';
import { JWTService, PasswordCrypto } from '../../shared/services';
import { validation } from '../../shared/middleware';
import { IUser } from '../../database/models';


interface IBodyProps extends Omit<IUser, 'id' | 'nome'> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    passWord: yup.string().required().min(6),
    email: yup.string().required().email().min(5),
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, passWord } = req.body;


  const user = await UsersProvider.getByEmail(email);
  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou Senha são inválidos'
      }
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(passWord, user.passWord);
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });
  } else {

    const accessToken = JWTService.sign({ uid: user.id });
    console.log(accessToken);
    
    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      });
    }

    return res.status(StatusCodes.OK).json({ accessToken });
  }
};
