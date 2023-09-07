import { db } from './utils'
import express, { NextFunction } from 'express'
import objectid from 'objectid'

const app = express();
app.use(express.json())
app.use(express.urlencoded());


app.get('/hello', (req, res) => {
    res.send('Hello There!').end()
})

app.get('/', (req, res) => {
    // console.log(req);

    res.json({ "status": "ok", "greetMessage": "Hello There!" })
})

const rows = await db.selectFrom('Question').selectAll().execute();
console.log(rows)

app.post('/question', async (req, res) => {
    const {
        answeringType,
        questionType,
        title,
        options
    } = req.body;

    const result = await db
        .insertInto('Question')
        .values({
            uniqueId: objectid().toString(),
            answeringType,
            questionType,
            title,
        })
        .executeTakeFirst()

    // console.log(answeringType, questionType, title, options)

    res.json({ "received": "yes", answeringType, questionType, title, options })

})



app.listen(1338, () => console.log('Starting Server... on 1338'))