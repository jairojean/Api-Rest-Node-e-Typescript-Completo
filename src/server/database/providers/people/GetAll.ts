import { ETableNames } from '../../ETableNames';
import { IPeople } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string): Promise<IPeople[] | Error> => {
  try {
    const result = await Knex(ETableNames.people)
      .select('*')
      .where('fullName', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
