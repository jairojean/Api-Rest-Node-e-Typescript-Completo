import { ICity, IPeople, IUser } from '../../models';


declare module 'knex/types/tables' {
  interface Tables {
   people: IPeople;
    city: ICity;
    user: IUser;
  }
}
