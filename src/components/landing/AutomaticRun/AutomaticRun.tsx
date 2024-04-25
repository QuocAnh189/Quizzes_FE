//next
import Image from 'next/image';

//assets
import { bigHeartImg, gradientPurpleImg, likeHandImg, quiteHeartImg, smallHeartImg, imageRunImg, raiseHandImg } from '../../../../public/assets/images/landing';

//animation
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

const AutomaticRun = () => {
    return (
        <motion.section
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.2 }}
            id='overview'
            className='relative w-screen overflow-hidden bg-white pb-0 pt-6'
        >
            <div className='mx-auto w-full max-w-[1440px] rounded-[4px] bg-transparent px-[3.13rem]'>
                <div className='relative flex flex-col items-center text-center'>
                    <Image src={gradientPurpleImg} alt='' className='absolute z-[1] inline-block h-auto w-[70em] max-w-full' />
                    <div className='flex flex-col gap-y-[2.75em] text-center'>
                        <div className='flex text-center'>
                            <Marquee>
                                <div className='flex flex-none gap-x-[2.75em] pr-[2.75em]'>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                </div>
                            </Marquee>
                            <Marquee>
                                <div className='flex flex-none gap-x-[2.75em] pr-[2.75em]'>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                </div>
                            </Marquee>
                            <Marquee>
                                <div className='flex flex-none gap-x-[2.75em] pr-[2.75em]'>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full object-cover' />
                                    </div>
                                </div>
                            </Marquee>
                        </div>
                        <div className='flex text-center'>
                            <Marquee direction='right'>
                                <div className='flex flex-none gap-x-[2.75em] pr-[2.75em]'>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                </div>
                            </Marquee>
                            <Marquee direction='right'>
                                <div className='flex flex-none gap-x-[2.75em] pr-[2.75em]'>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                </div>
                            </Marquee>
                            <Marquee direction='right'>
                                <div className='flex flex-none gap-x-[2.75em] pr-[2.75em]'>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                    <div className='flex w-[35.38em] flex-none overflow-hidden rounded-xl'>
                                        <Image src={imageRunImg} alt='' className='relative inline-block h-full w-full max-w-full  object-cover' />
                                    </div>
                                </div>
                            </Marquee>
                        </div>
                    </div>
                    <div className='absolute top-[7.19em] z-[2] flex flex-col items-center gap-10 text-center'>
                        <div className='block text-center text-[4em] font-bold leading-[1] tracking-[-0.025em] mdl:text-[6em] xl:text-[10em]'>
                            Select my
                            <br />
                        </div>
                        <div className='mt-[-2.1em] block'>
                            <div className='block text-center text-[4em] font-bold leading-[1] tracking-[-0.025em] mdl:text-[6em] xl:text-[10em]'>Quizzes</div>
                        </div>
                    </div>
                    <Image src={raiseHandImg} alt='' className='absolute bottom-[-4em] z-[4] inline-block h-[30.75em] w-[30.75em] max-w-full object-contain' />
                    <Image
                        src={bigHeartImg}
                        alt=''
                        className='absolute bottom-[0] z-[3] inline-block h-auto w-[10.25em] max-w-full translate-x-[19%] translate-y-[-28em]'
                    />
                    <Image
                        src={quiteHeartImg}
                        alt=''
                        className='inline-bock absolute bottom-[0] z-[1] h-auto w-[4.81em] max-w-full translate-x-[-4em] translate-y-[-21em] align-middle'
                    />
                    <Image
                        src={smallHeartImg}
                        alt=''
                        className='inline-bock absolute bottom-[0] z-[1] h-auto w-[2.75em] max-w-full translate-x-[-3.4em] translate-y-[-34em] align-middle'
                    />
                </div>
            </div>
        </motion.section>
    );
};

export default AutomaticRun;
