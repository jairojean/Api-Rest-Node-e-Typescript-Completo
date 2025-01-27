import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.people, table => {
      table.bigIncrements('id').primary().index();
      table.string('fullName').index().notNullable();
      table.string('email').unique().notNullable();

      table
        .bigInteger('cityId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.city)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');


      table.comment('Tabela usada para armazenar peoples do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.people}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.people)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.people}`);
    });
}
