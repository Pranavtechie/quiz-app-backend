import { Kysely, PostgresDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import { Pool } from 'pg';


export const db = new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: true

        }),
    }),
});

export function add(a: number, b: number): number {
    return a + b;
}
