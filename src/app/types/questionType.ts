import { AnswerNameEnum } from 'src/constants/enum';

export type AnswerType = {
    name: AnswerNameEnum;
    body: string;
    isCorrect: boolean;
};

const InitAnswer = {
    name: 'a',
    body: '',
    isCorrect: true
} as AnswerType;

type QuestionType = {
    _id?: string;
    tags?: string[];
    content: string;
    creatorId: string;
    backgroundImage: string;
    questionIndex: number;
    questionType: string;
    optionQuestion: string;
    pointType: string;
    isPublic: boolean;
    answerTime: number;
    maxCorrectAnswer: number;
    answerList: AnswerType[];
    correctAnswerCount: number;
    answerCorrect: string[];
    createdAt?: Date | null;
    updatedAt?: Date | null;
};

export const InitQuestion = {
    content: '',
    tags: [],
    creatorId: '',
    backgroundImage: '',
    questionType: 'Quiz',
    questionIndex: 0,
    optionQuestion: '',
    pointType: 'Standard',
    isPublic: true,
    answerTime: 5,
    maxCorrectAnswer: 1,
    answerList: [InitAnswer],
    correctAnswerCount: 0,
    answerCorrect: []
} as QuestionType;

export default QuestionType;
