export interface NestedTag {
  uniqueId: string;
  nestedTagName: string | null;
  parentTagId: string | null;
}

export interface Option {
  uniqueId: string;
  questionId: string | null;
  optionText: string | null;
  correctOption: boolean | null;
}

export interface ParentTag {
  uniqueId: string;
  tagName: string | null;
}

export interface Question {
  uniqueId: string;
  title: string | null;
  description: string | null;
  questionType: "fillInTheBlanks" | "findBug" | "findOutput" | "selectCorrectCodeSnippet" | "theory" | "trueOrFalse" | null;
  answeringType: "multiCorrect" | "singleCorrect" | null;
  userId: string | null;
}

export interface QuestionTag {
  uniqueId: string | null;
  questionId: string;
  nestedTagId: string;
}

export interface User {
  uniqueId: string;
  username: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  loginProvider: "discord" | "github" | "google" | null;
}

export interface DB {
  NestedTag: NestedTag;
  Option: Option;
  ParentTag: ParentTag;
  Question: Question;
  QuestionTag: QuestionTag;
  User: User;
}
