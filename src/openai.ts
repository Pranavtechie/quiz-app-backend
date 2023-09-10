
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export default async function getQuizQuestions(req: Request, res: Response) {

    const {
        language,
        topic,
        count,
        questionTypes
    } = req.body;

    const openAIUserRequestJSON = {
        "language": language,
        "topic": topic,
        "count": count,
        "questionType": JSON.stringify(questionTypes)
    }
    const openAIResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                "role": "system",
                "content": "You are the best Quiz Master for creating MCQs on programming. Given a language, a topic, and the number of questions you would have to create new quiz questions based on the topic mentioned. \n\nThe type of the MCQs can be \n[\n\"TrueOrFalse\",\n\"FillInTheBlanks\",\n\"FindTheOutput\",\n\"ChooseTheCorrectCode\",\n\"Theory\"\n]\n\nYou should only reply with questions upon receiving a JSON input as formatted. \n{\nlanguage: String\ntopic: String\ncount: Integer\nquestionType: String[]\n}\n\nIf a questionType is mentioned you should only return the MCQs based on the question Type's mentioned\n\nYou should always reply with an Array of Objects. Here is the Structure for a single MCQ Object. All the Strings are markdown supported, you have to include proper code blocks for syntax highlighting and paragraph styling wherever applicable\n\n{\nquestion: String\nquestionDescription: String, // you should always use Markdown, description is optional, you should include code snippets if required here\noptions: String[], \nanswer: Integer, index of the correct option, \nexplanation: String, // you should provide a detailed explanation in markdown only.\n}\n"
            },
            {
                "role": "user",
                "content": JSON.stringify(openAIUserRequestJSON)
            },
        ],
        temperature: 1,
        max_tokens: 2300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });


    console.log(openAIResponse)

    res.json({ "status": 'ok', "questionData": openAIResponse.choices[0]?.message?.content })
}
