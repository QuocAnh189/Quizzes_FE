// 'use client';

import React, { useState } from 'react';

//routes
import { useRouter } from 'next/navigation';

//animation
import { motion } from 'framer-motion';

//Redux
import { logIn } from 'src/app/redux/slices/authSlice';
import { useAppDispatch } from 'src/app/redux/hooks';
import { useSignUpMutation } from 'src/app/redux/services/authApi';
import { useDeleteImageMutation } from 'src/app/redux/services/providerApi';

//type
import { SignUpType } from 'src/app/variable';

//icons
import { FaTrashCan } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

//cloudinary
import { CldUploadWidget } from 'next-cloudinary';

//component
import { CircularProgress } from '@chakra-ui/react';

interface FormTypeProps {
    setShowFormWorkSpace: (state: boolean) => void;
    setShowUploadImage: (state: boolean) => void;
    handleChangeForm: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
    formData: SignUpType;
    avatar: string;
    setLoading: () => void;
}

const UploadAvatar = (props: FormTypeProps) => {
    const route = useRouter();
    const dispatch = useAppDispatch();

    const [newAvatar, setNewAvatar] = useState<string>();

    const [skip, setSkip] = useState<boolean>(false);

    const [Register, { isLoading }] = useSignUpMutation();
    const [DeleteAvatar] = useDeleteImageMutation();

    const handleSignUp = async () => {
        try {
            const result = await Register(props.formData).unwrap();
            if (result) {
                dispatch(logIn(result));
                route.push('/home');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeleteImage = async () => {
        if (newAvatar) {
            const public_id = newAvatar.substring(62, newAvatar.length - 4);
            await DeleteAvatar(public_id)
                .unwrap()
                .then((res) => {
                    setNewAvatar('');
                })
                .catch((e) => console.log(e));
        }
    };

    return (
        <div className='absolute left-[50%] top-[50%] min-h-screen w-[760px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-[50px] bg-bgBlackLight px-[210px] py-[75px] mdl:min-h-[600px]'>
            <div className='flex flex-col items-center gap-8 px-6 text-center'>
                <motion.h2
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className='text-center text-[1.5rem] font-bold leading-8 tracking-tight text-textWhite'
                >
                    Choose your image
                </motion.h2>
                <motion.p
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className='min-w-[400px] text-center text-sm text-textGray'
                >
                    Give your server a personality with a name and an image. You can always change it later.
                </motion.p>
                <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }} className='px-6'>
                    <div className='flex items-center justify-center'>
                        <div className='flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-textGray px-10 py-6 text-center'>
                            <CldUploadWidget
                                uploadPreset='quizzes_app'
                                options={{
                                    folder: 'quizzes/user',
                                    sources: ['local', 'url', 'google_drive'],
                                    multiple: false,
                                    styles: {}
                                }}
                                onSuccess={(result: any) => {
                                    setNewAvatar(result.info.secure_url);
                                    props.handleChangeForm({
                                        target: { name: 'avatar', value: result.info.secure_url }
                                    });
                                }}
                                onError={(error) => {
                                    console.log(error);
                                }}
                            >
                                {({ open }) => {
                                    return (
                                        <div className='relative h-[140px] w-[140px]'>
                                            <img
                                                className='h-full w-full rounded-[70px] object-cover'
                                                src={
                                                    newAvatar
                                                        ? newAvatar
                                                        : 'https://res.cloudinary.com/dadvtny30/image/upload/v1706534569/foodorder/user/lgdkebapensuoktdcmqa.png'
                                                }
                                            />
                                            <button className='absolute -right-6 top-0' onClick={handleDeleteImage}>
                                                <FaTrashCan size={32} color='white' />
                                            </button>
                                            <button
                                                className='absolute -right-6 bottom-0'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    open();
                                                }}
                                            >
                                                <MdEdit size={32} color='white' />
                                            </button>
                                        </div>
                                    );
                                }}
                            </CldUploadWidget>
                        </div>
                    </div>
                </motion.div>

                <motion.button
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className='block w-full py-4 text-sm font-bold text-textWhite hover:rounded-[18px] hover:text-[15px]'
                    onClick={() => {
                        setSkip(!skip);
                    }}
                >
                    Skip
                </motion.button>

                <motion.button
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className='mb-4 block w-full py-4 text-sm font-bold text-textWhite hover:rounded-[18px] hover:text-[15px]'
                    onClick={() => {
                        props.setShowFormWorkSpace(true);
                        props.setShowUploadImage(false);
                    }}
                >
                    Back
                </motion.button>
            </div>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className='absolute bottom-0 left-0 right-0 flex flex-row justify-end bg-bgGrayLight px-6 py-6'
            >
                {(props.avatar || skip) && (
                    <motion.button
                        disabled={isLoading}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className='cursor-pointer  rounded-xl bg-textGreen px-6 py-2 text-sm font-bold leading-7 text-textWhite hover:font-black'
                        onClick={handleSignUp}
                    >
                        {isLoading ? <CircularProgress isIndeterminate color='white' size={24} /> : 'Finished'}
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
};

export default UploadAvatar;
