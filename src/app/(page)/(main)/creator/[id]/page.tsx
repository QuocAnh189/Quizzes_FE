'use client';

// hook
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// components
import Modal from 'react-modal';
import ContentEditor from 'src/components/Creator/ContentEditor';
import CreatorNavbar from 'src/components/Creator/CreatorNavbar';
import CreatorSidebar from 'src/components/Creator/CreatorSidebar';
import QuizSettingModal from 'src/components/Creator/QuizSettingModal';
import ThemeModal from 'src/components/Creator/ThemeModal';
import DeleteQuestionDialog from 'src/components/Creator/dialog/DeleteQuestionDialog';

// redux
import { useGetQuizByIdQuery } from 'src/app/redux/services/quizApi';
import { useGetQuestionByIdQuery } from 'src/app/redux/services/questionApi';

// services
import LiquidLoading from 'src/components/LiquidLoading';
import QuestionType from 'src/app/types/questionType';

export default function QuizCreator() {
    const { id }: { id: string } = useParams();
    Modal.setAppElement('body');

    const [openDeleteQuestionDialog, setOpenDeleteQuestionDialog] = useState(false);
    const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);
    const [isOpenThemeModal, setIsOpenThemeModal] = useState(false);

    const [questionList, setQuestionList] = useState<QuestionType[]>([]);
    const [questionIndexActive, setQuestionIndexActive] = useState<number>(0);
    const { data: quiz, isFetching } = useGetQuizByIdQuery(id);
    const { data: questions, isSuccess } = useGetQuestionByIdQuery(id);

    useEffect(() => {
        setQuestionList(questions!);
    }, [questions, isSuccess]);

    if (isFetching) {
        return <LiquidLoading />;
    }

    const handleAddItemQuestion = (question: QuestionType) => {
        if (questionList) {
            setQuestionList([...questionList, { ...question, questionIndex: questionList.length }]);
        } else {
            setQuestionList([question]);
        }
    };

    const handleDeleteItemQuestion = (index: number) => {
        const filterQuestion = questionList.filter((question) => question.questionIndex !== index);
        const newQuestion = filterQuestion.map((question) => {
            if (question.questionIndex > index) {
                question.questionIndex--;
            }
            return question;
        });
        setQuestionList(newQuestion);
    };

    return (
        <>
            <main>
                <CreatorNavbar quiz={quiz!} setIsOpenSettingModal={setIsOpenSettingModal} setIsOpenThemeModal={setIsOpenThemeModal} />
                <CreatorSidebar
                    questionList={questionList}
                    handleAddItemQuestion={handleAddItemQuestion}
                    handleDeleteItemQuestion={handleDeleteItemQuestion}
                    active={questionIndexActive}
                    setQuestionIndexActive={(index) => setQuestionIndexActive(index)}
                />
                {questionList?.length && <ContentEditor questionData={questionList[questionIndexActive]} />}
            </main>

            {openDeleteQuestionDialog && <DeleteQuestionDialog open={openDeleteQuestionDialog} />}

            {isOpenSettingModal && <QuizSettingModal isOpenModal={isOpenSettingModal} setIsOpenModal={setIsOpenSettingModal} quiz={quiz!} />}

            {isOpenThemeModal && <ThemeModal isOpenModal={isOpenThemeModal} setIsOpenModal={setIsOpenThemeModal} />}
        </>
    );
}
