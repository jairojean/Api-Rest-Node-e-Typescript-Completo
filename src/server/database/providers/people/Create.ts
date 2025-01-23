import { ETableNames } from '../../ETableNames';
import { IPeople } from '../../models';
import { Knex } from '../../knex';


export const create = async (people: Omit<IPeople, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.city)
      .where('id', '=', people.cityId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('A city usada no cadastro não foi encontrada');
    }


    const [result] = await Knex(ETableNames.people).insert(people).returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
