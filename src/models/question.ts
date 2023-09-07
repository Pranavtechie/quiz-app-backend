import { db } from "../utils";
import objectid from "objectid";

export async function createCompleteQuizQuestion(
    answeringType: string,
    questionType: string,
    title: string
) {
    let data = await db
        .insertInto("Question")
        .values({
            uniqueId: objectid().toString(),
            answeringType,
            questionType,
            title,
        })
        .executeTakeFirst();
}
