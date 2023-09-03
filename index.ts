import { db } from './utils'


const rows = await db.selectFrom('question').selectAll().execute();
console.log(rows)