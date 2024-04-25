'use client';

import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

//animation
import { motion } from 'framer-motion';

//validates
import { RequireLong, RequireShort } from 'src/app/validates';

//images
import Image from 'next/image';
import { loadingImg } from '../../../public/assets/images/auth';

//components
import ErrorNotify from './Error';

//Redux
import { useCheckUserNameMutation } from 'src/app/redux/services/authApi';

interface FormSignUpProps {
    setShowFormSignUp: (state: boolean) => void;
    setShowFormUserName: (state: boolean) => void;
    setShowFormUserType: (state: boolean) => void;
    handleChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
    firstName: string;
    lastName: string;
    userName: string;
}

const FormUserName = (props: FormSignUpProps) => {
    const mounted = useRef<boolean>(true);
    const [click, setClick] = useState<boolean>(false);

    const [checkUserName, { data, isError, isSuccess, isLoading }] = useCheckUserNameMutation();

    useEffect(() => {
        if (
            !props.firstName ||
            !props.lastName ||
            !props.userName ||
            RequireShort(props.firstName) !== 'strong' ||
            RequireShort(props.lastName) !== 'strong' ||
            RequireLong(props.userName) !== 'strong'
        ) {
            setClick(false);
        } else {
            setClick(true);
        }
    }, [props.firstName, props.lastName, props.userName]);

    const handleContinue = () => {
        if (click) {
            checkUserName({ userName: props.userName });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            props.setShowFormUserName(false);
            props.setShowFormUserType(true);
        }
    }, [isSuccess]);

    return (
        <div className='absolute left-[50%] top-[50%] min-h-full w-[760px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-[50px] bg-bgBlackLight px-[210px] py-[75px] mdl:min-h-[600px]'>
            <div className='flex h-full w-full flex-col items-center justify-center gap-y-2'>
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className='text-[6rem]'>
                    👋
                </motion.div>
                <motion.h1
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className='mb-[15px] text-[2rem] text-textWhite'
                >
                    What's your name?
                </motion.h1>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className='flex flex-row items-center justify-around'
                >
                    <div className='relative mb-[7px] w-2/5'>
                        <input
                            value={props.firstName}
                            type='text'
                            name='firstName'
                            className={clsx(
                                `m-0 block w-full rounded-[18px] border border-solid border-textFog bg-bgInput bg-clip-padding px-5 py-[13.5px] text-[1rem] font-semibold leading-normal text-textWhite outline-none placeholder:italic focus:border-[2px] focus:border-bgBlue`,
                                RequireShort(props.firstName) === 'weak' && 'border-textError focus:border-textError',
                                RequireShort(props.firstName) === 'strong' && 'border-textGreen focus:border-textGreen'
                            )}
                            placeholder='firstName'
                            onChange={props.handleChangeForm}
                        />
                    </div>
                    <div className='relative mb-[7px] w-2/5'>
                        <input
                            value={props.lastName}
                            type='text'
                            name='lastName'
                            className={clsx(
                                `m-0 block w-full rounded-[18px] border border-solid border-textFog bg-bgInput bg-clip-padding px-5 py-[13.5px] text-[1rem] font-semibold leading-normal text-textWhite outline-none placeholder:italic focus:border-[2px] focus:border-bgBlue`,
                                RequireShort(props.lastName) === 'weak' && 'border-textError focus:border-textError',
                                RequireShort(props.lastName) === 'strong' && 'border-textGreen focus:border-textGreen'
                            )}
                            placeholder='lastName'
                            onChange={props.handleChangeForm}
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className='relative mb-[7px] w-full'
                >
                    <input
                        value={props.userName}
                        name='userName'
                        className={clsx(
                            `m-0 block w-full rounded-[18px] border border-solid border-textFog bg-bgInput bg-clip-padding px-5 py-[13.5px] text-[1rem] font-semibold leading-normal text-textWhite outline-none placeholder:italic focus:border-[2px] focus:border-bgBlue`,
                            RequireLong(props.userName) === 'weak' && 'border-textError focus:border-textError',
                            RequireLong(props.userName) === 'strong' && 'border-textGreen focus:border-textGreen'
                        )}
                        placeholder='userName'
                        onChange={props.handleChangeForm}
                    />
                </motion.div>

                {isError && <ErrorNotify message='UserName already exists' />}

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className='flex h-[60px] w-full flex-col items-center justify-center'
                >
                    <button
                        className={clsx(
                            `mt-2 flex w-full min-w-[300px] items-center justify-center rounded-[20px] bg-bgBlue px-20 py-[10px] text-[16px] font-semibold text-textWhite`,
                            click ? 'cursor-pointer bg-bgBlue hover:py-[12px] hover:font-bold' : 'cursor-default bg-textGray'
                        )}
                        onClick={handleContinue}
                    >
                        {isLoading ? <Image src={loadingImg} alt='' className='h-7 w-7 self-center' /> : "That's me"}
                    </button>
                </motion.div>

                <motion.button
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className='block w-full py-4 text-sm font-bold text-textWhite hover:rounded-[18px] hover:text-[15px]'
                    onClick={() => {
                        props.setShowFormSignUp(true);
                        props.setShowFormUserName(false);
                    }}
                >
                    Back
                </motion.button>
            </div>
        </div>
    );
};

export default FormUserName;
