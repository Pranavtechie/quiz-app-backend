import { db } from './utils'
import express, { NextFunction } from 'express'
import getQuizQuestions from "./openai"
import objectid from 'objectid'
import sampleQuestion from "../sample-item.json"
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded());


app.get('/hello', (req, res) => {
    res.send('Hello There!').end()
})

app.get('/', (req, res) => {
    // console.log(req);

    res.json({ "status": "ok", "greetMessage": "Hello There!" })
})

// const rows = await db.selectFrom('Question').selectAll().execute();
// console.log(rows)

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

app.post('/register', (req, res) => {
    const { name,
        profileImage,
        email,
        username,
        loginProvider } = req.body;


    await db.insertInto('User')
})

app.post('/generateQuizQuestions', getQuizQuestions)

app.get('/sampleQuestion', (req, res) => {
    res.json({ "data": sampleQuestion, "status": "ok" })
})

app.listen(1338, () => console.log('Starting Server... on 1338'))