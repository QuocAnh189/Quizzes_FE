'use client';

//component
import QuestionItem from './QuestionItem';

//redux
import { useAppDispatch, useAppSelector } from 'src/app/redux/hooks';
import { addQuestion } from 'src/app/redux/slices/quizCreatorSlice';

//icon
import { FaPlus } from 'react-icons/fa';
import QuestionType, { InitQuestion } from 'src/app/types/questionType';

interface Props {
    questionList: QuestionType[];
    handleAddItemQuestion: (question: QuestionType) => void;
    handleDeleteItemQuestion: (index: number) => void;
    active: number;
    setQuestionIndexActive: (index: number) => void;
}

function CreatorSidebar(props: Props) {
    const { questionList, handleAddItemQuestion, handleDeleteItemQuestion, active, setQuestionIndexActive } = props;

    return (
        <>
            <div className='fixed bottom-0 left-0 z-[100] flex h-20 w-full flex-row items-center justify-center bg-white lg:h-full lg:w-52 lg:flex-col'>
                <div className='flex scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded scrollbar-w-2 scrollbar-h-2 max-lg:h-full max-lg:w-full max-lg:gap-2 max-lg:overflow-x-auto lg:mt-15 lg:h-auto lg:max-h-full lg:w-full lg:flex-col lg:overflow-y-auto'>
                    {questionList?.map((question, index) => (
                        <QuestionItem
                            key={index}
                            isActive={index === active}
                            questionData={question}
                            setQuestionIndexActive={setQuestionIndexActive}
                            handleDeleteItemQuestion={handleDeleteItemQuestion}
                        />
                    ))}
                </div>

                <div className='flex flex-shrink-0 flex-grow basis-auto items-center justify-start px-3 lg:min-w-full lg:flex-col lg:px-6'>
                    <div className='mb-2 mt-4'>
                        <button
                            onClick={() => {
                                handleAddItemQuestion(InitQuestion);
                            }}
                            className='rounded bg-blue-500 px-4 pb-3 pt-2 shadow-[inset_0_-5px_rgba(0,0,0,0.3)] duration-100 hover:mt-[2px] hover:pb-[10px] hover:shadow-[inset_0_-4px_rgba(0,0,0,0.3)] active:mt-1 active:pb-2 active:shadow-[inset_0_-2px_rgba(0,0,0,0.3)]'
                        >
                            <span className='font-semibold text-white max-lg:hidden'>Add Question</span>
                            <FaPlus className='hidden text-white max-lg:inline' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreatorSidebar;
