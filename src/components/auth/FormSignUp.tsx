'use client';

import React, { useEffect, useState, useRef } from 'react';
import Switch from 'react-switch';
import clsx from 'clsx';

//images
import Image from 'next/image';
import { logoImg } from '../../../public/assets/images/auth';
import { loadingImg } from '../../../public/assets/images/auth';

//routes
import { useRouter } from 'next/navigation';

//icons
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';

//animation
import { motion } from 'framer-motion';

//validates
import { EmailFormat, RequirePassword } from 'src/app/validates';

//components
import ErrorNotify from './Error';

//RTKQuery
import { useCheckEmailMutation } from 'src/app/redux/services/authApi';

interface FormSignUpProps {
    setShowFormSignUp: (state: boolean) => void;
    setShowFormUserName: (state: boolean) => void;
    handleChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
    password: string;
}

const FormSignUp = (props: FormSignUpProps) => {
    const mounted = useRef<boolean>(true);
    const router = useRouter();

    const [click, setClick] = useState<boolean>(false);
    const [check, setCheck] = useState<boolean>(false);
    const [showPassWord, setShowPassWord] = useState<boolean>(false);

    const [checkMail, { isError, isLoading, isSuccess }] = useCheckEmailMutation();

    useEffect(() => {
        if (!props.email || !props.password || !check || RequirePassword(props.password) !== 'strong' || !EmailFormat(props.email)) {
            setClick(false);
        } else {
            setClick(true);
        }
    }, [props.email, props.password, check]);

    const handleContinue = () => {
        if (click) {
            checkMail({ email: props.email });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            props.setShowFormSignUp(false);
            props.setShowFormUserName(true);
        }
    }, [isSuccess]);

    return (
        <div className='absolute left-[50%] top-[50%] min-h-full w-[760px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-[50px] bg-textWhite px-[210px] py-[75px] mdl:min-h-[600px]'>
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className='mb-[30px] flex flex-row items-center justify-center gap-x-4'
            >
                <Image src={logoImg} alt='' className='h-[50px] w-[50px]' />
                <p className='text-[36px] font-black text-textBlack'>Quizzes</p>
            </motion.div>
            <div className='block h-full'>
                <div className='mt-4 flex flex-col'>
                    <div className='flex flex-col'>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className='relative mb-6'
                            data-te-input-wrapper-init
                        >
                            <input
                                value={props.email}
                                type='email'
                                name='email'
                                className={clsx(
                                    `block min-h-[auto] w-full rounded-2xl border-[2px] px-3 py-[0.8rem] font-semibold placeholder-gray-400 outline-none placeholder:italic focus:border-[2px] focus:border-bgBlue`,
                                    EmailFormat(props.email) === false && 'border-textError focus:border-textError',
                                    EmailFormat(props.email) === true && 'border-textGreen focus:border-textGreen'
                                )}
                                placeholder='Enter email'
                                onChange={props.handleChangeForm}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className='relative mb-6'
                            data-te-input-wrapper-init
                        >
                            <input
                                value={props.password}
                                type={showPassWord ? 'text' : 'password'}
                                name='password'
                                className={clsx(
                                    `min-h-[auto] w-full rounded-2xl border bg-transparent px-3 py-[0.8rem] font-semibold placeholder-gray-400 outline-none placeholder:italic focus:border-[2px] focus:border-bgBlue`,
                                    RequirePassword(props.password) === 'strong' && 'border-textGreen focus:border-textGreen',
                                    RequirePassword(props.password) === 'weak' && 'border-textError focus:border-textError',
                                    RequirePassword(props.password) === 'medium' && 'border-textYellow focus:border-textYellow'
                                )}
                                placeholder='Set password'
                                onChange={props.handleChangeForm}
                            />
                            <button
                                className='absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer'
                                onClick={() => {
                                    setShowPassWord(!showPassWord);
                                }}
                            >
                                {showPassWord ? <AiFillEye className=' h-[20px] w-[20px]' /> : <AiFillEyeInvisible className=' h-[20px] w-[20px]' />}
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                            className='mb-4 flex w-full items-center justify-center text-right'
                        >
                            <Switch
                                onChange={() => {
                                    setCheck(!check);
                                }}
                                checked={check}
                            />
                            <span className='ml-[10px] mt-0 inline-block h-[30px] text-sm font-semibold leading-[30px]'>
                                Accept <a className='text-textBlueLight outline-none'>Terms of use</a> and{' '}
                                <a className='text-textBlueLight outline-none'>Privacy policy</a>
                            </span>
                        </motion.div>

                        {isError && <ErrorNotify message='Email already exists' />}

                        <motion.button
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className={clsx(
                                `flex w-full items-center justify-center rounded-2xl bg-bgBlue py-[0.6rem] font-bold leading-7 text-textWhite`,
                                click ? 'cursor-pointer bg-bgBlue' : 'cursor-default bg-textGray'
                            )}
                            onClick={handleContinue}
                        >
                            {isLoading ? <Image src={loadingImg} alt='' className='h-7 w-7 self-center' /> : 'Sign Up'}
                        </motion.button>
                    </div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className='mt-3 flex w-full flex-col gap-y-2'
                    >
                        <button
                            onClick={() => router.push('/signIn')}
                            className='block w-full py-4 text-sm font-semibold hover:rounded-[18px] hover:bg-bgGrayLight hover:text-[15px]'
                        >
                            Already have an account? Sign In
                        </button>

                        <button
                            className='block w-full py-4 text-sm font-bold hover:rounded-[18px] hover:bg-bgGrayLight hover:text-[15px]'
                            onClick={() => router.back()}
                        >
                            Back
                        </button>
                    </motion.div>
                </div>
            </div>
            <motion.div className='absolute bottom-0 left-[50%] min-h-[70px] w-full translate-x-[-50%] text-center'>
                <p className='font-semibold text-textGray'>
                    ©2023 quizzes GmbH -<span className='font-bold text-textBlack'> Imprint & Privacy Policy</span>
                </p>
            </motion.div>
        </div>
    );
};

export default FormSignUp;
