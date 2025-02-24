//hook
import { useState } from 'react';
import { useForm } from 'react-hook-form';
//next
import Image from 'next/image';

//component
import { InputBase } from '@mui/material';
import { CldUploadWidget } from 'next-cloudinary';

//icon
import { HiDotsVertical, HiPlus } from 'react-icons/hi';

// utils
import { cn } from 'src/utils/tailwind.util';

// constants
import { QuestionTypeEnum } from 'src/constants/enum';

// components
import QuestionSettingSidebar from './QuestionSettingSidebar';
import AnswerItem from 'src/components/Creator/AnswerItem';

// redux
import { useAppDispatch, useAppSelector } from 'src/app/redux/hooks';
import { setQuestionBackgroundImage, setQuestionContent } from 'src/app/redux/slices/quizCreatorSlice';
import QuestionType from 'src/app/types/questionType';

interface Props {
    questionData: QuestionType;
}

export default function ContentEditor(props: Props) {
    const { questionData } = props;

    const { theme } = useAppSelector((state) => state.quizCreator);
    const { user } = useAppSelector((state) => state.auth.authData);

    const [isOpenQuestionSettingSidebar, setIsOpenQuestionSettingSidebar] = useState(true);

    const handleOpenSettingQuiz = () => {
        setIsOpenQuestionSettingSidebar(!isOpenQuestionSettingSidebar);
    };

    const { register, handleSubmit, setValue, reset, watch } = useForm<QuestionType>({
        values: { ...questionData, creatorId: user._id }
        // values: watch()
    });

    console.log(watch());

    // useEffect(() => {
    //     console.log(watch());
    //     reset(watch()), [reset];
    // }, [reset]);

    const onSubmit = async (data: QuestionType) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
                className={cn(
                    'relative mt-15 transform pt-6 duration-300 scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded scrollbar-w-2 scrollbar-h-2 max-lg:mb-20 lg:ml-52 lg:h-[calc(100vh-60px)]',
                    {
                        'lg:mr-72': isOpenQuestionSettingSidebar
                    }
                )}
                style={{
                    backgroundImage: `url(${theme})`,
                    backgroundSize: 'cover',
                    transition: 'all 0.8s ease'
                }}
            >
                <div className='px-4'>
                    <div className='flex text-center'>
                        <InputBase
                            {...register('content')}
                            value={watch().content}
                            className='w-full rounded-md bg-white px-4 py-2 shadow-[inset_0_-4px_rgba(0,0,0,0.1)] lg:text-3xl'
                            placeholder='Start typing your question ...'
                            multiline
                            minRows={1}
                            maxRows={2}
                            inputProps={{
                                className: 'text-center',
                                maxLength: 120
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') e.preventDefault();
                            }}
                        />
                        <span onClick={handleOpenSettingQuiz} className='ml-4 flex items-center justify-center rounded-full bg-white p-2 lg:hidden'>
                            <HiDotsVertical className='text-xl text-black' />
                        </span>
                    </div>

                    {/* Image */}
                    <div className='mt-8 flex items-center justify-center rounded'>
                        <div
                            className={cn('relative flex h-60 w-full flex-col items-center justify-center rounded-lg  text-center max-lg:h-96 2xl:w-1/4', {
                                'lg:h-80': questionData.questionType === QuestionTypeEnum.TRUE_FALSE
                            })}
                        >
                            <CldUploadWidget
                                uploadPreset='quizzes_app'
                                options={{
                                    folder: 'quizzes/questions',
                                    sources: ['local', 'url', 'google_drive'],
                                    multiple: false,
                                    styles: {}
                                }}
                                onSuccess={(results: any) => {
                                    setValue('backgroundImage', results.info.secure_url);
                                }}
                            >
                                {({ open }) => {
                                    return (
                                        <div className='h-full w-96 cursor-pointer rounded bg-white shadow-md' onClick={() => open()}>
                                            <div className='relative h-full w-full'>
                                                {questionData.backgroundImage && (
                                                    <Image
                                                        src={questionData.backgroundImage}
                                                        fill
                                                        className='object-contain'
                                                        alt='Question Image'
                                                        sizes='100%'
                                                    />
                                                )}
                                            </div>
                                            {!questionData.backgroundImage && (
                                                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                                                    <div className='inline-flex items-center justify-center rounded-lg bg-white p-2'>
                                                        <HiPlus className='text-3xl' />
                                                    </div>
                                                    <p className='mt-4'>Find and insert media</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }}
                            </CldUploadWidget>
                        </div>
                    </div>

                    {/* Answer List */}
                    <div className='mt-8 flex flex-col items-center justify-center gap-2 lg:grid lg:grid-cols-2'>
                        {questionData.questionType === QuestionTypeEnum.TRUE_FALSE ? (
                            <>
                                <AnswerItem isTrueFalse={true} answer={questionData.answerList[0]} />
                                <AnswerItem isTrueFalse={true} answer={questionData.answerList[1]} />
                            </>
                        ) : (
                            questionData.answerList.map((answer, index) => <AnswerItem isTrueFalse={false} key={index} answer={answer} />)
                        )}
                    </div>
                </div>
            </div>

            {isOpenQuestionSettingSidebar && (
                <QuestionSettingSidebar isOpen={isOpenQuestionSettingSidebar} setOpen={setIsOpenQuestionSettingSidebar} register={register} />
            )}
        </form>
    );
}
