'use client';

//images
import Image from 'next/image';

import clsx from 'clsx';

//animation
import { motion } from 'framer-motion';
import { studentsImg, teacherImg } from '../../../public/assets/images/auth';

interface FormTypeProps {
    setShowFormUserName: (state: boolean) => void;
    setShowFormUserType: (state: boolean) => void;
    setShowFormWorkSpace: (state: boolean) => void;
    handleChangeForm: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
    handleSignUp: () => void;
    userType: string;
}

const FormUserType = (props: FormTypeProps) => {
    const handleContinue = () => {
        if (props.userType) {
            props.setShowFormUserType(false);
            props.setShowFormWorkSpace(true);
        }
    };

    return (
        <div className='absolute left-[50%] top-[50%] min-h-full w-[760px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-[50px] bg-bgBlackLight px-[210px] py-[75px] font-sans mdl:min-h-[600px]'>
            <div className='flex h-full w-full flex-col items-center justify-center gap-y-2'>
                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className='text-[6rem]'>
                    👨‍💻
                </motion.div>
                <motion.h1
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className='mb-[15px] break-words px-2 text-center text-[2rem] font-black leading-[1.3em] text-textWhite mdl:w-[560px]'
                >
                    What kind of customer are you using quizzes for?
                </motion.h1>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className={clsx(
                        `flex min-h-[50px] w-[400px] flex-1 cursor-pointer flex-row items-center justify-between rounded-[20px] bg-bgBlackType px-4 outline-none hover:bg-bgBlackHover mdl:w-[600px]`,
                        props.userType === 'Student' && 'border-[2px] border-bgBlue'
                    )}
                    onClick={() => {
                        props.handleChangeForm({
                            target: { name: 'userType', value: 'Student' }
                        });
                    }}
                >
                    <div className='flex flex-row items-center justify-center gap-x-2'>
                        <Image alt='' src={studentsImg} className='h-[30px] w-[30px]' />
                        <span className='min-w-[100px] font-semibold text-textWhite'>Student</span>
                    </div>
                    <div>
                        <p className='text-textGray'>Join game to play with friends.</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className={clsx(
                        `flex min-h-[50px] w-[400px] flex-1 cursor-pointer flex-row items-center justify-between rounded-[20px] bg-bgBlackType px-4 outline-none hover:bg-bgBlackHover mdl:w-[600px]`,
                        props.userType === 'Teacher' && 'border-[2px] border-bgBlue'
                    )}
                    onClick={() => {
                        props.handleChangeForm({
                            target: { name: 'userType', value: 'Teacher' }
                        });
                    }}
                >
                    <div className='flex flex-row items-center justify-center gap-x-2'>
                        <Image alt='' src={teacherImg} className='h-[30px] w-[30px]' />
                        <span className='min-w-[100px] font-semibold text-textWhite'>Teacher</span>
                    </div>
                    <div className='max-w-[220px] mdl:max-w-full'>
                        <p className='text-textGray'>Create, quizzes store , organize for students joining game.</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className='flex h-[60px] w-full flex-col items-center justify-center'
                >
                    <button
                        className={clsx(
                            `mt-2 flex w-[160px] max-w-[200px] items-center justify-center rounded-[20px] bg-bgBlue py-[12px] text-center text-[16px] text-textWhite`,
                            props.userType
                                ? 'cursor-pointer bg-bgBlue font-semibold hover:py-[14px] hover:font-bold'
                                : 'cursor-default bg-textGray font-semibold'
                        )}
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </motion.div>

                <motion.button
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className='block w-full py-4 text-sm font-bold  text-textWhite hover:rounded-[18px] hover:text-[15px]'
                    onClick={() => {
                        props.setShowFormUserType(false);
                        props.setShowFormUserName(true);
                    }}
                >
                    Back
                </motion.button>
            </div>
        </div>
    );
};

export default FormUserType;
