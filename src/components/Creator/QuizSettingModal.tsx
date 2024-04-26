//hook
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

//next
import Image from 'next/image';
import Modal from 'react-modal';

//cloudinary
import { CldUploadWidget } from 'next-cloudinary';

//component
import { FormControlLabel, InputBase, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Skeleton } from '@mui/material';
import { ToastOptions } from 'src/constants/toast';
import { toast } from 'react-toastify';

//type
import QuizType from 'src/app/types/quizType';

//redux
import { useGetAllCategoriesQuery } from 'src/app/redux/services/categoryApi';
import { useGetAllGradesQuery } from 'src/app/redux/services/gradeApi';
import { BiTrash } from 'react-icons/bi';
import { useDeleteImageMutation } from 'src/app/redux/services/providerApi';
import { useUpdateQuizMutation } from 'src/app/redux/services/quizApi';
import { resultOne } from '../../../public/assets/images/game';

const customStylesModal: any = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 298,
        cursor: ''
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        padding: '0',
        border: 'none',
        outline: 'none',
        zIndex: 299
    }
};

interface IProps {
    quiz: any;
    isOpenModal: boolean;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

function QuizSettingModal(props: IProps) {
    const { isOpenModal, setIsOpenModal, quiz } = props;

    const { data: categories, isFetching: fetchingCategory } = useGetAllCategoriesQuery();
    const { data: grades, isFetching: fetchingGrade } = useGetAllGradesQuery();

    const [DeleteImage, { isLoading: loadingDeleteImage }] = useDeleteImageMutation();
    const [UpdateQuiz, { isLoading: loadingUpdateQuiz }] = useUpdateQuizMutation();

    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            name: quiz.name,
            description: quiz.description,
            coverImage: quiz.coverImage,
            isPublic: quiz.isPublic,
            category: quiz.category || null,
            grade: quiz.grade || null,
            pointsPerQuestion: quiz.pointsPerQuestion || 0,
            tags: quiz.tags || ''
        }
    });

    const onSubmit = async (data: any) => {
        try {
            const result = await UpdateQuiz({ id: quiz._id!, data }).unwrap();
            if (result) {
                setIsOpenModal(false);
                toast.success('Update quiz succesfully', ToastOptions);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteImage = async () => {
        if (watch().coverImage) {
            const public_id = watch().coverImage?.substring(62, watch().coverImage?.length! - 4);
            await DeleteImage(public_id!)
                .unwrap()
                .then((res) => {
                    setValue('coverImage', quiz.coverImage);
                })
                .catch((e) => console.log(e));
        }
    };

    return (
        <Modal
            isOpen={isOpenModal}
            style={customStylesModal}
            onRequestClose={() => {
                setIsOpenModal(false);
            }}
        >
            <div className='h-screen  w-screen rounded md:h-[90vh]  md:w-[90vw] lg:w-[80vw] xl:w-[70vw] '>
                <form onSubmit={handleSubmit(onSubmit)} className='h-full w-full bg-white p-4 md:px-6 md:pb-2 md:pt-4 lg:p-10'>
                    <h1 className='text-lg font-bold'>Quiz Summary</h1>

                    {/* Content */}
                    <div className='flex justify-between max-lg:mt-4 max-md:flex-col-reverse md:gap-8 lg:mt-8'>
                        {/* Left Content */}
                        <div className='w-full max-lg:mt-4 md:w-1/2 lg:w-[55%]'>
                            {/* Title */}
                            <div>
                                <h2 className='font-semibold'>Title</h2>
                                <InputBase
                                    {...register('name')}
                                    className='mt-2 min-w-full rounded px-2 outline outline-1 outline-gray-300 focus-within:outline-blue-700 hover:outline-gray-600'
                                    placeholder='Enter your quiz title...'
                                />
                            </div>

                            {/* Description */}
                            <div className='mt-4'>
                                <h2 className='font-semibold'>Description</h2>
                                <InputBase
                                    {...register('description')}
                                    multiline
                                    rows={3}
                                    placeholder='Enter your quiz description...'
                                    className='mt-2 min-w-full rounded px-2 outline outline-1 outline-gray-300 focus-within:outline-blue-700 hover:outline-gray-600'
                                />
                            </div>

                            {/* Category */}
                            <div className='mt-4'>
                                <h2 className='font-semibold'>Category</h2>
                                {fetchingCategory ? (
                                    <Skeleton />
                                ) : (
                                    <Select
                                        {...register('category')}
                                        placeholder='Choose category'
                                        className='mt-2 w-full'
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 200,
                                                    zIndex: 300
                                                }
                                            }
                                        }}
                                        value={watch().category}
                                    >
                                        {categories?.map((category, index) => (
                                            <MenuItem key={index} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            </div>

                            {/* Grade */}
                            <div className='mt-4'>
                                <h2 className='font-semibold'>Grade</h2>
                                {fetchingGrade ? (
                                    <Skeleton />
                                ) : (
                                    <Select
                                        className='mt-2 w-full'
                                        {...register('grade')}
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 200,
                                                    zIndex: 300
                                                }
                                            }
                                        }}
                                        value={watch().grade}
                                    >
                                        {grades?.map((grade: any, index: any) => (
                                            <MenuItem key={index} value={grade._id}>
                                                {grade.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className='mt-4 md:mt-0 md:w-1/2 lg:w-[45%]'>
                            {/* Cover Image */}
                            <CldUploadWidget
                                // {...register('coverImage')}
                                uploadPreset='quizzes_app'
                                options={{
                                    folder: 'quizzes/quiz',
                                    sources: ['local', 'url', 'google_drive'],
                                    multiple: false,
                                    styles: {}
                                }}
                                onSuccess={(result: any) => {
                                    setValue('coverImage', result.info.secure_url);
                                }}
                            >
                                {({ open }) => {
                                    return (
                                        <div className='h-80 w-full md:h-3/5'>
                                            <h2 className='font-semibold'>Cover Image</h2>
                                            <div className='relative mt-2 h-[90%] w-full rounded bg-gray-200'>
                                                <div className='relative h-full w-full'>
                                                    <Image
                                                        src={watch().coverImage || '/assets/images/default_quiz_background.png'}
                                                        objectFit='contain'
                                                        alt='Default Cover Image'
                                                        fill
                                                        sizes='100%'
                                                        className='rounded'
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        open();
                                                    }}
                                                    className='absolute bottom-[5%] left-1/2 -translate-x-1/2 rounded bg-blue-500 px-4 pb-3 pt-2 shadow-[inset_0_-5px_rgba(0,0,0,0.3)] duration-100 hover:mt-[2px] hover:pb-[10px] hover:shadow-[inset_0_-4px_rgba(0,0,0,0.3)] active:mt-1 active:pb-2 active:shadow-[inset_0_-2px_rgba(0,0,0,0.3)]'
                                                >
                                                    <span className='font-semibold text-white'>Change</span>
                                                </button>
                                                <button disabled={loadingDeleteImage} className='absolute right-4 top-4' onClick={handleDeleteImage}>
                                                    <BiTrash color='white' size={32} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }}
                            </CldUploadWidget>

                            {/* Visibility & Points Per Question */}
                            <div className='flex items-center justify-between max-lg:mt-4 lg:mt-6'>
                                {/* Visibility */}
                                <div className=''>
                                    <h2 className='font-semibold'>Visibility</h2>
                                    <RadioGroup {...register('isPublic')} defaultValue={true} row>
                                        <FormControlLabel value={true} control={<Radio />} label='Public' />
                                        <FormControlLabel value={false} control={<Radio />} label='Private' />
                                    </RadioGroup>
                                </div>

                                {/* Points Per Question */}
                                <div className=''>
                                    <h2 className='font-semibold'>Points Per Question</h2>
                                    <input
                                        type='number'
                                        {...register('pointsPerQuestion')}
                                        className='mt-2 w-full rounded px-2 py-1 outline outline-1 outline-gray-300 hover:outline-gray-600 focus:outline-blue-700'
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <h2 className='inline-block font-semibold'>Tags</h2>
                                <span className='text-sm text-gray-500'> (separate by comma)</span>
                                <input
                                    {...register('tags')}
                                    className='mt-2 w-full rounded px-2 py-1 outline outline-1 outline-gray-300 hover:outline-gray-600 focus:outline-blue-700'
                                    placeholder='Example: tag1, tag2, tag3'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className='mt-12 flex justify-center gap-4 max-lg:pb-4'>
                        <button
                            onClick={() => {
                                setIsOpenModal(false);
                            }}
                            className='w-32 rounded bg-[#f2f2f2] px-4 pb-3 pt-2 shadow-[inset_0_-5px_rgba(0,0,0,0.3)] duration-100 hover:mt-[2px] hover:pb-[10px] hover:shadow-[inset_0_-4px_rgba(0,0,0,0.3)] active:mt-1 active:pb-2 active:shadow-[inset_0_-2px_rgba(0,0,0,0.3)]'
                        >
                            <span className='font-semibold text-black'>Cancel</span>
                        </button>

                        <button
                            disabled={loadingUpdateQuiz}
                            type='submit'
                            className='w-32 rounded bg-[#26890c] px-4 pb-3 pt-2 shadow-[inset_0_-5px_rgba(0,0,0,0.3)] duration-100 hover:mt-[2px] hover:pb-[10px] hover:shadow-[inset_0_-4px_rgba(0,0,0,0.3)] active:mt-1 active:pb-2 active:shadow-[inset_0_-2px_rgba(0,0,0,0.3)]'
                        >
                            <span className='font-semibold text-white'>Save</span>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
export default QuizSettingModal;
