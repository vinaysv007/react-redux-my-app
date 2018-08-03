import knex from 'knex';
import bookshelf from 'bookshelf';
import knexfile from '../knexfile';

export default bookshelf(knex(knexfile.development));