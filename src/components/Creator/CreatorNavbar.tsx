//hook
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

//next
import Image from 'next/image';
import Link from 'next/link';

// icons
import { IoSettingsOutline } from 'react-icons/io5';
import { BiSave } from 'react-icons/bi';
import { RxExit } from 'react-icons/rx';

// components
import ExitEditDialog from './dialog/ExitEditDialog';
import QuizType from 'src/app/types/quizType';
import { toast } from 'react-toastify';

// constants
import paths from 'src/constants/paths';
import { CreatorMessages } from 'src/constants/messages';
import { ToastOptions } from 'src/constants/toast';
import { QuestionTypeEnum } from 'src/constants/enum';

// Redux
import { useAppDispatch, useAppSelector } from 'src/app/redux/hooks';
import { saveQuiz } from 'src/app/redux/slices/quizCreatorSlice';
import { useUpdateQuizMutation } from 'src/app/redux/services/quizApi';
import { saveQuizFromCreator } from 'src/app/redux/slices/quizSlice';

interface IProps {
    quiz: any;
    setIsOpenSettingModal: Dispatch<SetStateAction<boolean>>;
    setIsOpenThemeModal: Dispatch<SetStateAction<boolean>>;
}

function CreatorNavbar(props: IProps) {
    const { setIsOpenSettingModal, setIsOpenThemeModal, quiz } = props;
    const dispatch = useAppDispatch();

    const router = useRouter();

    const [updateQuiz, { data, isSuccess, isLoading, isError, error }] = useUpdateQuizMutation();

    const [isOpenExitEditDialog, setIsOpenExitEditDialog] = useState<boolean>(false);

    const handleOpenSettingModal = () => {
        setIsOpenSettingModal(true);
    };

    const handleOpenThemeModal = () => {
        setIsOpenThemeModal(true);
    };

    useEffect(() => {
        if (isError) {
            console.log('Create Navbar Error: ', (error as any)?.data?.message);
        }
    }, [isError]);

    const handleExitQuiz = () => {
        if (quiz.category?._id === '') {
            toast.error(CreatorMessages.ERROR.CATEGORY_REQUIRED, ToastOptions);
            return;
        }
        if (quiz.grade?._id === '') {
            toast.error(CreatorMessages.ERROR.GRADE_REQUIRED, ToastOptions);
            return;
        }
        setIsOpenExitEditDialog(true);
    };

    const handleQuizSubmit = async () => {
        if (quiz.category?._id === '') {
            toast.error(CreatorMessages.ERROR.CATEGORY_REQUIRED, ToastOptions);
            return;
        }
        if (quiz.grade?._id === '') {
            toast.error(CreatorMessages.ERROR.GRADE_REQUIRED, ToastOptions);
            return;
        }
        // if (!validateQuestionList()) return;
        // dispatch(saveQuiz());
        try {
            const objectUpdate = {
                id: quiz._id!,
                data: quiz
            };
            const result = await updateQuiz(objectUpdate).unwrap();
            if (result) {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='fixed left-0 top-0 z-[110] w-full bg-white px-2 py-2.5 shadow dark:bg-gray-900'>
                <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center'>
                        <Link href={paths.home} className='flex items-center'>
                            <div className='relative mr-1 h-9 w-9 '>
                                <Image
                                    src='https://res.cloudinary.com/dfoiuc0jw/image/upload/v1702777748/quiz-app/logo/logo.png'
                                    alt='Quizzes logo'
                                    fill
                                    sizes='100'
                                />
                            </div>

                            <span className='self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white md:max-lg:hidden'>Quizzes</span>
                        </Link>

                        <button
                            onClick={handleOpenSettingModal}
                            className='ml-4 flex items-center justify-between rounded-md md:p-1 md:outline md:outline-1 md:outline-gray-300 lg:min-w-[360px]'
                        >
                            <p className='ml-1 line-clamp-1 hidden w-2/3 overflow-hidden truncate text-ellipsis text-left font-bold text-gray-400 md:inline md:pr-6 lgl:pr-12'>
                                {quiz.name || 'Enter your quiz title...'}
                            </p>
                            <div className='flex items-center justify-center rounded bg-gray-300 px-1 py-1 max-md:h-8 max-md:w-8 md:justify-between md:px-2'>
                                <IoSettingsOutline className='h-5 w-5 md:mr-1' />
                                <span className='hidden font-bold md:inline'>Settings</span>
                            </div>
                        </button>

                        {/* Set Themes */}
                        <button
                            onClick={handleOpenThemeModal}
                            className='ml-4 flex items-center justify-center rounded bg-blue-500 px-2 py-2 text-sm font-medium text-white hover:bg-gray-400 focus:outline-none md:px-5'
                        >
                            <span className='inline font-bold'>Themes</span>
                        </button>

                        <button
                            onClick={handleOpenThemeModal}
                            className='ml-4 flex items-center justify-center rounded bg-purple-700 px-2 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none md:px-5'
                        >
                            <span className='inline font-bold'>Import</span>
                        </button>
                    </div>

                    <div className='flex items-center'>
                        <button onClick={handleExitQuiz} className='flex items-center'>
                            <div className='mr-2 flex items-center justify-center rounded-lg bg-gray-300 px-2.5 py-2.5 text-sm font-medium text-white hover:bg-gray-400 focus:outline-none md:px-5'>
                                <RxExit className='h-5 w-5 text-black' />
                                <span className='ml-1 font-bold text-black max-md:hidden'>Exit</span>
                            </div>
                        </button>

                        <button onClick={handleQuizSubmit} className='flex items-center'>
                            <div className='flex items-center justify-center rounded-lg bg-purple-700 px-2.5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 md:px-5 '>
                                <BiSave className='h-5 w-5' />
                                <span className='ml-1 font-bold max-md:hidden'>Save All Question</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <ExitEditDialog open={isOpenExitEditDialog} setIsOpenExitEditDialog={setIsOpenExitEditDialog} />
        </>
    );
}

export default CreatorNavbar;
